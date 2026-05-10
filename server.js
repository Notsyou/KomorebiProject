import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    // Mirror mysql2's [rows, fields] tuple so all route code stays identical
    return [result.rows, result.fields ?? []];
  }
  // mysql2 already returns [rows, fields]
  return pool.query(sql, params);
}

/* ═══════════════════════════════════════════
   EXPRESS APP
═══════════════════════════════════════════ */

const app = express();

app.use(cors({
  origin: [
    'http://127.0.0.1:5500',
    'http://localhost:5500',
    'https://komorebi-maps.onrender.com'   // ← live Render frontend
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
app.post('/api/login', async (req, res) => {
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
app.post('/api/signup', async (req, res) => {
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