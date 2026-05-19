import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';

/* ═══════════════════════════════════════════
   DATABASE BOOTSTRAP — MySQL ↔ PostgreSQL
═══════════════════════════════════════════ */

const DATABASE_URL = process.env.DATABASE_URL; // e.g. postgresql://komorebi_admin:...
const IS_POSTGRES  = !!DATABASE_URL;

let pool;   // unified pool handle

if (IS_POSTGRES) {
  /* ── PostgreSQL (Render) ── */
  const pkg = await import('pg');
  const { Pool } = pkg.default ?? pkg;

  pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false }   // required by Render's managed Postgres
  });

  console.log('Database: PostgreSQL (Render)');
} else {
  /* ── MySQL (local / Docker) ── */
  const mysql = await import('mysql2/promise');

  pool = mysql.default.createPool({
    host:     process.env.DB_HOST     || 'localhost',
    user:     process.env.DB_USER     || 'komorebi_user',
    password: process.env.DB_PASSWORD || 'komorebipassword',
    database: process.env.DB_NAME     || 'komorebi_maps',
    waitForConnections: true,
    connectionLimit: 10
  });

  console.log('Database: MySQL (local)');
}

/* ─── Query wrapper ───────────────────────────────────────────────────────────
   Provides a unified interface regardless of which driver is active.

   MySQL  pool.query(sql, params) already returns [rows, fields].
   Postgres pool.query(sql, params) returns { rows, fields }.

   Additionally converts MySQL-style '?' placeholders to Postgres-style
   '$1', '$2', … when running against PostgreSQL.
────────────────────────────────────────────────────────────────────────────── */
function convertPlaceholders(sql) {
  let i = 0;
  return sql.replace(/\?/g, () => `$${++i}`);
}

async function query(sql, params = []) {
  if (IS_POSTGRES) {
    const pgSql = convertPlaceholders(sql);
    const result = await pool.query(pgSql, params);
    // 👇 Attach rowCount so the DELETE route can read it!
    const rows = result.rows || [];
    rows.rowCount = result.rowCount; 
    return [rows, result.fields ?? []];
  }
}

/* ═══════════════════════════════════════════
   EXPRESS APP
═══════════════════════════════════════════ */

const app = express();

/* ─── Trust Render's load balancer so rate limiters see real client IPs ─── */
app.set('trust proxy', 1);

/* ═══════════════════════════════════════════
   RATE LIMITING
═══════════════════════════════════════════ */

/* General API limiter — 100 requests per 15 minutes per IP */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,   // sends RateLimit-* headers (RFC 6585)
  legacyHeaders: false,
  handler: (req, res) =>
    res.status(429).json({ error: 'Too many requests, please try again later.' })
});

/* Auth limiter — 10 attempts per hour per IP (brute-force protection) */
const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    res.status(429).json({ error: 'Too many requests, please try again later.' })
});

app.use('/api/', limiter);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, Postman, server-to-server)
    if (!origin) return callback(null, true);

    const allowed = [
      'http://127.0.0.1:5500',
      'http://localhost:5500',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'null',                                          // direct file:// open (origin is "null")
      'https://komorebi-maps.onrender.com',            // live Render frontend
      'https://komorebproject-backend.onrender.com',   // Render backend (health checks)
    ];

    // Also allow any *.onrender.com subdomain (covers Render preview deployments)
    const isRenderPreview = /^https:\/\/[a-z0-9-]+\.onrender\.com$/.test(origin);

    if (allowed.includes(origin) || isRenderPreview) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Explicitly handle pre-flight OPTIONS for all routes
app.options('*', cors());

app.use(express.json());

const JWT_SECRET  = process.env.JWT_SECRET || 'fallback_secret';
const SALT_ROUNDS = 10;

/* ─── Middleware: Verify JWT ─── */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

/* ═══════════════════════════════════════════
   AUTH ROUTES
═══════════════════════════════════════════ */

/* POST /api/login */
app.post('/api/login', authLimiter, async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Username and password are required.' });

  try {
    const [rows] = await query('SELECT * FROM users WHERE username = ?', [username]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password_hash)))
      return res.status(401).json({ error: 'Invalid credentials.' });

    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username: user.username, message: 'Welcome to Komorebi Maps.' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/* POST /api/signup */
app.post('/api/signup', authLimiter, async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  if (password.length < 8)
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });

  try {
    const [existing] = await query(
      'SELECT id FROM users WHERE username = ? OR email = ?', [username, email]
    );
    if (existing.length > 0)
      return res.status(409).json({ error: 'Username or email already in use.' });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    let newUserId;

    if (IS_POSTGRES) {
      // RETURNING id — Postgres does not support insertId
      const [rows] = await query(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?) RETURNING id',
        [username, email, hash]
      );
      newUserId = rows[0].id;
    } else {
      const [result] = await query(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, hash]
      );
      newUserId = result.insertId;
    }

    const token = jwt.sign({ id: newUserId, username }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ token, username, message: 'Account created. Welcome!' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

/* ═══════════════════════════════════════════
   USER PROFILE ROUTES
═══════════════════════════════════════════ */

/* GET /api/user/profile — Fetch email */
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const [rows] = await query('SELECT email, created_at FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ error: 'User not found.' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
});

/* PUT /api/user/password — Change password */
app.put('/api/user/password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'Valid current and new passwords (min 8 chars) are required.' });
  }
  try {
    const [rows] = await query('SELECT password_hash FROM users WHERE id = ?', [req.user.id]);
    if (!rows.length) return res.status(404).json({ error: 'User not found.' });
    
    const valid = await bcrypt.compare(currentPassword, rows[0].password_hash);
    if (!valid) return res.status(401).json({ error: 'Incorrect current password.' });

    const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, req.user.id]);
    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
});

/* DELETE /api/user/profile — Delete account */
app.delete('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    await query('DELETE FROM users WHERE id = ?', [req.user.id]);
    res.json({ message: 'Account deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Database error.' });
  }
});

/* ═══════════════════════════════════════════
   BOOKMARK ROUTES
═══════════════════════════════════════════ */

/* GET /api/bookmarks */
app.get('/api/bookmarks', authenticateToken, async (req, res) => {
  try {
    const [rows] = await query(
      'SELECT location_id FROM bookmarks WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json(rows);
  } catch (err) {
    console.error('Bookmark fetch error:', err);
    res.status(500).json({ error: 'Database query failed.' });
  }
});

/* POST /api/bookmarks — toggle (add/remove) */
app.post('/api/bookmarks', authenticateToken, async (req, res) => {
  const { locationId } = req.body;
  if (!locationId) return res.status(400).json({ error: 'locationId is required.' });

  try {
    const [existing] = await query(
      'SELECT id FROM bookmarks WHERE user_id = ? AND location_id = ?',
      [req.user.id, locationId]
    );

    if (existing.length > 0) {
      await query('DELETE FROM bookmarks WHERE id = ?', [existing[0].id]);
      res.json({ message: 'Bookmark removed.', status: 'removed' });
    } else {
      await query(
        'INSERT INTO bookmarks (user_id, location_id) VALUES (?, ?)',
        [req.user.id, locationId]
      );
      res.json({ message: 'Location saved to collection.', status: 'added' });
    }
  } catch (err) {
    console.error('Bookmark toggle error:', err);
    res.status(500).json({ error: 'Database operation failed.' });
  }
});

/* POST /api/bookmarks/sync — additive merge of guest bookmarks on login */
app.post('/api/bookmarks/sync', authenticateToken, async (req, res) => {
  const { locationIds } = req.body;

  if (!Array.isArray(locationIds) || locationIds.length === 0)
    return res.status(400).json({ error: 'locationIds must be a non-empty array.' });

  if (locationIds.length > 100)
    return res.status(400).json({ error: 'Cannot sync more than 100 bookmarks at once.' });

  const invalid = locationIds.some(id => typeof id !== 'string' || !id.trim());
  if (invalid)
    return res.status(400).json({ error: 'All locationIds must be non-empty strings.' });

  try {
    const trimmed = locationIds.map(id => id.trim());
    let inserted = 0;

    if (IS_POSTGRES) {
      /* ── PostgreSQL: row-by-row with ON CONFLICT DO NOTHING ──
         Multi-row VALUES ? syntax is MySQL-specific; this is cleaner
         for Postgres and still runs in a single transaction.           */
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        for (const locationId of trimmed) {
          const result = await client.query(
            `INSERT INTO bookmarks (user_id, location_id)
             VALUES ($1, $2)
             ON CONFLICT (user_id, location_id) DO NOTHING`,
            [req.user.id, locationId]
          );
          inserted += result.rowCount;
        }
        await client.query('COMMIT');
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
    } else {
      /* ── MySQL: multi-row INSERT IGNORE in one round-trip ── */
      const rows = trimmed.map(id => [req.user.id, id]);
      const [result] = await pool.query(
        'INSERT IGNORE INTO bookmarks (user_id, location_id) VALUES ?',
        [rows]
      );
      inserted = result.affectedRows;
    }

    res.json({
      message:  'Sync complete.',
      inserted,
      skipped: trimmed.length - inserted
    });
  } catch (err) {
    console.error('Bookmark sync error:', err);
    res.status(500).json({ error: 'Database operation failed.' });
  }
});

/* ═══════════════════════════════════════════
   REVIEW ROUTES
═══════════════════════════════════════════ */

/* GET /api/reviews/:locationId — public */
app.get('/api/reviews/:locationId', async (req, res) => {
  const { locationId } = req.params;
  try {
    const [rows] = await query(`
      SELECT
        r.id, r.text, r.rating,
        u.username AS author,
        r.created_at AS date
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.location_id = ?
      ORDER BY r.created_at DESC
      LIMIT 50
    `, [locationId]);
    res.json(rows);
  } catch (err) {
    console.error('Reviews fetch error:', err);
    res.status(500).json({ error: 'Database query failed.' });
  }
});

/* POST /api/reviews — auth required */
app.post('/api/reviews', authenticateToken, async (req, res) => {
  const { locationId, rating, text } = req.body;

  if (!locationId || !text)
    return res.status(400).json({ error: 'locationId and text are required.' });
  if (rating < 1 || rating > 5)
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  if (text.length > 1000)
    return res.status(400).json({ error: 'Review must be under 1000 characters.' });

  try {
    const [existing] = await query(
      'SELECT id FROM reviews WHERE user_id = ? AND location_id = ?',
      [req.user.id, locationId]
    );

    if (existing.length > 0) {
      await query(
        'UPDATE reviews SET text = ?, rating = ?, updated_at = NOW() WHERE id = ?',
        [text, rating, existing[0].id]
      );
      return res.json({
        id:     existing[0].id,
        message: 'Review updated.',
        author: req.user.username,
        rating, text,
        date: new Date().toISOString().split('T')[0]
      });
    }

    let newReviewId;

    if (IS_POSTGRES) {
      const [rows] = await query(
        'INSERT INTO reviews (user_id, location_id, rating, text) VALUES (?, ?, ?, ?) RETURNING id',
        [req.user.id, locationId, rating, text]
      );
      newReviewId = rows[0].id;
    } else {
      const [result] = await query(
        'INSERT INTO reviews (user_id, location_id, rating, text) VALUES (?, ?, ?, ?)',
        [req.user.id, locationId, rating, text]
      );
      newReviewId = result.insertId;
    }

    res.status(201).json({
      id:     newReviewId,
      message: 'Review posted.',
      author: req.user.username,
      rating, text,
      date: new Date().toISOString().split('T')[0]
    });
  } catch (err) {
    console.error('Review post error:', err);
    res.status(500).json({ error: 'Database operation failed.' });
  }
});

/* ═══════════════════════════════════════════
   TOUR ROUTES
═══════════════════════════════════════════ */

/* ─── GET /api/tours ────────────────────────────────────────────────────────
   Returns the authenticated user's full saved itinerary array, with each
   tour's activities sub-array sorted by step_index ASC.

   Response shape mirrors the localStorage object exactly so the client-side
   renderFullItinerariesPage() and openTourDetail() need zero changes:

   [
     {
       name:       "Old Town & Temples Walk",
       duration:   "Full Day · 8hrs",
       price:      "¥18,000",           // null if not set
       activities: [
         { time: "08:00 AM", title: "Senso-ji Temple", desc: "...", locId: "l-tok-01" },
         { time: "11:30 AM", title: "Yanaka Ginza",    desc: "..." }
       ]
     },
     …
   ]
────────────────────────────────────────────────────────────────────────────── */
app.get('/api/tours', authenticateToken, async (req, res) => {
  try {
    /* 1. Pull all parent tour rows for this user */
    const [tourRows] = await query(
      `SELECT id, name, duration, price
       FROM saved_tours
       WHERE user_id = ?
       ORDER BY updated_at DESC`,
      [req.user.id]
    );

    if (tourRows.length === 0) return res.json([]);

    /* 2. Pull all activity rows for these tours in one round-trip */
    const tourIds = tourRows.map(t => t.id);

    /* Build a parameterised IN clause that works for both drivers.
       MySQL:    WHERE tour_id IN (?, ?, ?)
       Postgres: WHERE tour_id IN ($1, $2, $3)          */
    const placeholders = tourIds.map(() => '?').join(', ');
    const [activityRows] = await query(
      `SELECT tour_id, loc_id, time, title, description
       FROM saved_tour_activities
       WHERE tour_id IN (${placeholders})
       ORDER BY tour_id, step_index ASC`,
      tourIds
    );

    /* 3. Group activities by tour_id for O(n) assembly */
    const activityMap = new Map();
    for (const act of activityRows) {
      if (!activityMap.has(act.tour_id)) activityMap.set(act.tour_id, []);
      activityMap.get(act.tour_id).push({
        time:  act.time,
        title: act.title,
        desc:  act.description,
        ...(act.loc_id ? { locId: act.loc_id } : {})
      });
    }

    /* 4. Assemble final response — shape is identical to localStorage objects */
    const tours = tourRows.map(t => ({
      name:       t.name,
      duration:   t.duration,
      price:      t.price ?? undefined,
      activities: activityMap.get(t.id) ?? []
    }));

    res.json(tours);
  } catch (err) {
    console.error('Tours fetch error:', err);
    res.status(500).json({ error: 'Database query failed.' });
  }
});

/* ─── POST /api/tours ───────────────────────────────────────────────────────
   Saves or hard-overwrites a named itinerary for the authenticated user.

   Expected body:
   {
     name:       "Old Town & Temples Walk",
     duration:   "Full Day · 8hrs",
     price:      "¥18,000",               // optional
     activities: [
       { time: "08:00 AM", title: "Senso-ji Temple", desc: "...", locId: "l-tok-01" },
       { time: "11:30 AM", title: "Yanaka Ginza",    desc: "..." }
     ]
   }

   Conflict strategy: hard overwrite — matches localStorage behaviour where
   saving a tour with the same name replaces the previous entry.
   The overwrite is wrapped in a transaction so a partial failure never leaves
   an orphaned parent with no activities (PG: pool.connect(); MySQL: sequential
   awaits with manual rollback since pool.query doesn't expose transactions).
────────────────────────────────────────────────────────────────────────────── */
app.post('/api/tours', authenticateToken, async (req, res) => {
  const { name, duration, price, activities } = req.body;

  /* ── Input validation ── */
  if (!name || typeof name !== 'string' || !name.trim())
    return res.status(400).json({ error: 'Tour name is required.' });
  if (!duration || typeof duration !== 'string')
    return res.status(400).json({ error: 'Tour duration is required.' });
  if (!Array.isArray(activities) || activities.length === 0)
    return res.status(400).json({ error: 'activities must be a non-empty array.' });
  if (activities.length > 50)
    return res.status(400).json({ error: 'A tour cannot exceed 50 stops.' });

  const safeName     = name.trim();
  const safeDuration = duration.trim();
  const safePrice    = (typeof price === 'string' && price.trim()) ? price.trim() : null;

  /* Validate each activity has minimum required fields */
  for (const [i, act] of activities.entries()) {
    if (!act.time || !act.title)
      return res.status(400).json({ error: `Activity at index ${i} is missing time or title.` });
  }

  if (IS_POSTGRES) {
    /* ── PostgreSQL path — explicit transaction via pool.connect() ── */
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      /* Delete existing tour with the same name for this user (hard overwrite) */
      await client.query(
        'DELETE FROM saved_tours WHERE user_id = $1 AND name = $2',
        [req.user.id, safeName]
      );

      /* Insert fresh parent row, capture new ID via RETURNING */
      const tourResult = await client.query(
        `INSERT INTO saved_tours (user_id, name, duration, price)
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [req.user.id, safeName, safeDuration, safePrice]
      );
      const newTourId = tourResult.rows[0].id;

      /* Bulk-insert all activity rows */
      for (const [idx, act] of activities.entries()) {
        await client.query(
          `INSERT INTO saved_tour_activities (tour_id, step_index, loc_id, time, title, description)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            newTourId,
            idx,
            act.locId || null,
            act.time.trim(),
            act.title.trim(),
            (act.desc || act.description || '').trim() || null
          ]
        );
      }

      await client.query('COMMIT');
      res.status(201).json({ message: 'Tour saved.', tourId: newTourId });
    } catch (err) {
      await client.query('ROLLBACK');
      console.error('Tour save error (PG):', err);
      res.status(500).json({ error: 'Database operation failed.' });
    } finally {
      client.release();
    }

  } else {
    /* ── MySQL path — sequential awaits with manual rollback ──
       mysql2's pool.query() doesn't expose BEGIN/COMMIT directly;
       we grab a connection from the pool and drive the transaction
       the same way the PG path does.                              */
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      /* Hard overwrite: delete the old parent (CASCADE removes its activities) */
      await conn.query(
        'DELETE FROM saved_tours WHERE user_id = ? AND name = ?',
        [req.user.id, safeName]
      );

      /* Insert fresh parent row */
      const [tourResult] = await conn.query(
        `INSERT INTO saved_tours (user_id, name, duration, price)
         VALUES (?, ?, ?, ?)`,
        [req.user.id, safeName, safeDuration, safePrice]
      );
      const newTourId = tourResult.insertId;

      /* Bulk-insert activity rows */
      for (const [idx, act] of activities.entries()) {
        await conn.query(
          `INSERT INTO saved_tour_activities (tour_id, step_index, loc_id, time, title, description)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            newTourId,
            idx,
            act.locId || null,
            act.time.trim(),
            act.title.trim(),
            (act.desc || act.description || '').trim() || null
          ]
        );
      }

      await conn.commit();
      res.status(201).json({ message: 'Tour saved.', tourId: newTourId });
    } catch (err) {
      await conn.rollback();
      console.error('Tour save error (MySQL):', err);
      res.status(500).json({ error: 'Database operation failed.' });
    } finally {
      conn.release();
    }
  }
});

/* ─── DELETE /api/tours ─────────────────────────────────────────────────────
   Deletes a named tour for the authenticated user.

   Expected body: { name: "Old Town & Temples Walk" }

   Child activity rows are removed automatically via ON DELETE CASCADE.
   Matches the localStorage deletion pattern: filter by name, no numeric IDs
   needed on the client side.
────────────────────────────────────────────────────────────────────────────── */
app.delete('/api/tours', authenticateToken, async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || !name.trim())
    return res.status(400).json({ error: 'Tour name is required.' });

  try {
    const [result] = await query(
      'DELETE FROM saved_tours WHERE user_id = ? AND name = ?',
      [req.user.id, name.trim()]
    );

    /* Both mysql2 and pg return an object with affectedRows / rowCount */
    const affected = IS_POSTGRES ? result.rowCount : result.affectedRows;

    if (affected === 0)
      return res.status(404).json({ error: 'Tour not found.' });

    res.json({ message: 'Tour deleted.' });
  } catch (err) {
    console.error('Tour delete error:', err);
    res.status(500).json({ error: 'Database operation failed.' });
  }
});

/* ─── Health check ─── */
app.get('/api/health', async (req, res) => {
  try {
    await query('SELECT 1');
    res.json({ status: 'ok', db: IS_POSTGRES ? 'postgresql' : 'mysql' });
  } catch {
    res.status(503).json({ status: 'error', db: 'unreachable' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Komorebi API running on port ${PORT} [${IS_POSTGRES ? 'PostgreSQL' : 'MySQL'}]`)
);