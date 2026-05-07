'use strict';

/* ═══════════════════════════════════════════
   STATE
═══════════════════════════════════════════ */
const bookmarks   = new Map();  // locationId → location object
let   bkFilter    = 'all';
let   toastTimer  = null;
let   leafletMap  = null;       // Leaflet instance (reused)
let   leafletMarker = null;
let   currentLoc  = null;       // location object open in modal
let   reviewRating = 0;
let   lbImages    = [];         // current lightbox images array
let   lbIndex     = 0;

/* ═══════════════════════════════════════════
   LOCATIONS DATABASE
   Includes: lat/lng, gallery images (real Wikimedia Commons), category, sub
═══════════════════════════════════════════ */
const locationsDB = {
  'c01': [
    {
      id: 'l-c01-a', title: 'Don Quijote Dotonbori', icon: '🛒', cat: 'culture',
      sub: 'Osaka • Discount Store',
      desc: 'Massive multi-story shop with a dedicated wall of regional and limited-edition KitKats.',
      lat: 34.6687, lng: 135.5014,
      address: '7-13 Soemoncho, Chuo Ward, Osaka',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Dotonbori_Osaka_2012.jpg/1280px-Dotonbori_Osaka_2012.jpg', caption: 'Dotonbori at night, Osaka' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Glico_man_2014.jpg/800px-Glico_man_2014.jpg', caption: 'Glico Man sign, Dotonbori' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Osaka_Dotonbori_street.jpg/1280px-Osaka_Dotonbori_street.jpg', caption: 'Dotonbori street view' }
      ]
    },
    {
      id: 'l-c01-b', title: 'KitKat Chocolatory Ginza', icon: '🍫', cat: 'culture',
      sub: 'Tokyo • Ginza',
      desc: 'Premium boutique offering high-end, chef-crafted KitKat variations exclusive to this store.',
      lat: 35.6714, lng: 139.7654,
      address: '5-5-8 Ginza, Chuo City, Tokyo',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Ginza_at_Night.jpg/1280px-Ginza_at_Night.jpg', caption: 'Ginza at dusk, Tokyo' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Ginza_Wako_1.jpg/1280px-Ginza_Wako_1.jpg', caption: 'Ginza shopping district' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ginza_shopping_street.jpg/1280px-Ginza_shopping_street.jpg', caption: 'Ginza street scene' }
      ]
    },
    {
      id: 'l-c01-c', title: 'Kansai Airport Duty Free', icon: '✈️', cat: 'culture',
      sub: 'Osaka • Airport',
      desc: 'Last stop for Kansai-exclusive KitKat flavours like Uji Matcha and Hojicha before flying home.',
      lat: 34.4347, lng: 135.2441,
      address: 'Senshu-kuko Kita, Izumisano, Osaka',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Kansai_International_Airport_at_night.jpg/1280px-Kansai_International_Airport_at_night.jpg', caption: 'Kansai International Airport' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Kansai_airport_terminal.jpg/1280px-Kansai_airport_terminal.jpg', caption: 'KIX terminal interior' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Renzo_Piano%2C_Kansai_Airport_-_Luftbild.jpg/1280px-Renzo_Piano%2C_Kansai_Airport_-_Luftbild.jpg', caption: 'Renzo Piano\'s airport island design' }
      ]
    }
  ],
  'c02': [
    {
      id: 'l-c02-a', title: 'Betty Smith Jeans Museum', icon: '🧵', cat: 'culture',
      sub: 'Okayama • Kojima',
      desc: 'The definitive destination for Japanese denim — vintage shuttle looms, customization, and a famous jean street.',
      lat: 34.4794, lng: 133.8163,
      address: '1-7-3 Kojima Ajino, Kurashiki, Okayama',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Kojima_jeans_street.jpg/1280px-Kojima_jeans_street.jpg', caption: 'Kojima Jeans Street, Okayama' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Kurashiki_bikan_district.jpg/1280px-Kurashiki_bikan_district.jpg', caption: 'Kurashiki historic district nearby' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Raw_denim_texture.jpg/1280px-Raw_denim_texture.jpg', caption: 'Selvedge denim texture detail' }
      ]
    }
  ],
  'c03': [
    {
      id: 'l-c03-a', title: 'Suntory Yamazaki Distillery', icon: '🏭', cat: 'culture',
      sub: 'Osaka • Shimamoto',
      desc: 'The birthplace of Japanese whisky. Guided tours and an exclusive tasting library spanning over a century.',
      lat: 34.8831, lng: 135.6647,
      address: '5-2-1 Yamazaki, Shimamoto, Mishima District, Osaka',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Yamazaki_distillery.jpg/1280px-Yamazaki_distillery.jpg', caption: 'Yamazaki Distillery, Osaka' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Whisky_barrels.jpg/1280px-Whisky_barrels.jpg', caption: 'Aging barrels, warehouse' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Whiskey_glass_photo.jpg/1280px-Whiskey_glass_photo.jpg', caption: 'Japanese whisky in tasting glass' }
      ]
    },
    {
      id: 'l-c03-b', title: 'Bar High Five', icon: '🥃', cat: 'culture',
      sub: 'Tokyo • Ginza',
      desc: 'World-renowned for perfectly carved ice and a collection of rare Japanese whisky vintages dating back decades.',
      lat: 35.6714, lng: 139.7647,
      address: 'Efflore Ginza 5 B1F, 5-4-15 Ginza, Chuo, Tokyo',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Ginza_at_Night.jpg/1280px-Ginza_at_Night.jpg', caption: 'Ginza nightlife district' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Whiskey_glass_photo.jpg/1280px-Whiskey_glass_photo.jpg', caption: 'Hand-carved ice sphere in glass' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Ginza_Wako_1.jpg/1280px-Ginza_Wako_1.jpg', caption: 'Ginza district exterior' }
      ]
    },
    {
      id: 'l-c03-c', title: 'Nikka Yoichi Distillery', icon: '🏔️', cat: 'culture',
      sub: 'Hokkaido • Yoichi',
      desc: 'Historic stone buildings producing rich, peaty whisky using traditional coal-fired pot stills in coastal Hokkaido.',
      lat: 43.2022, lng: 140.7876,
      address: '7-6 Kurokawa-cho, Yoichi, Hokkaido',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Nikka_Whisky_Yoichi_Distillery.jpg/1280px-Nikka_Whisky_Yoichi_Distillery.jpg', caption: 'Nikka Yoichi Distillery entrance' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Whisky_barrels.jpg/1280px-Whisky_barrels.jpg', caption: 'Yoichi barrel warehouse' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Yoichi_town_Hokkaido.jpg/1280px-Yoichi_town_Hokkaido.jpg', caption: 'Yoichi town, coastal Hokkaido' }
      ]
    }
  ],
  'q01': [
    {
      id: 'l-q01-a', title: 'Sukiyabashi Jiro', icon: '🍣', cat: 'cuisine',
      sub: 'Tokyo • Ginza',
      desc: 'The legendary Michelin-starred sushi counter nestled in a Ginza subway station. Reservation required months in advance.',
      lat: 35.6722, lng: 139.7629,
      address: 'Tsukamoto Sogyo Building B1, 2-15 Ginza, Chuo, Tokyo',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Sushi_platter.jpg/1280px-Sushi_platter.jpg', caption: 'Edomae sushi omakase platter' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Ginza_at_Night.jpg/1280px-Ginza_at_Night.jpg', caption: 'Ginza district, Tokyo' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Camponotus_flavomarginatus_ant.jpg/1280px-Camponotus_flavomarginatus_ant.jpg', caption: 'Seasonal nigiri detail' }
      ]
    },
    {
      id: 'l-q01-b', title: 'Toyosu Market', icon: '🐟', cat: 'cuisine',
      sub: 'Tokyo • Koto',
      desc: "The world's largest wholesale fish market. Surrounding stalls offer Tokyo's freshest breakfast sushi from 5 AM.",
      lat: 35.6451, lng: 139.7855,
      address: '6-6-1 Toyosu, Koto, Tokyo',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Tsukiji_market_fish.jpg/1280px-Tsukiji_market_fish.jpg', caption: 'Fish auction, Tokyo wholesale market' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Sushi_platter.jpg/1280px-Sushi_platter.jpg', caption: 'Morning sushi from market stalls' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Tokyo_Big_Sight_2009.jpg/1280px-Tokyo_Big_Sight_2009.jpg', caption: 'Toyosu waterfront area' }
      ]
    }
  ],
  'n02': [
    {
      id: 'l-n02-a', title: 'Arashiyama Bamboo Grove', icon: '🎋', cat: 'nature',
      sub: 'Kyoto • Arashiyama',
      desc: 'Ten thousand moso bamboo stalks filter dawn light into vertical green corridors. Enter at 6 AM for solitude.',
      lat: 35.0095, lng: 135.6694,
      address: 'Sagaogurayama Tabuchiyamacho, Ukyo Ward, Kyoto',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1280px-A_small_cup_of_coffee.JPG', caption: 'Dawn light through bamboo' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Arashiyama_bamboo_grove.jpg/800px-Arashiyama_bamboo_grove.jpg', caption: 'Arashiyama Bamboo Grove path' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Togetsu-kyo_bridge_in_Arashiyama.jpg/1280px-Togetsu-kyo_bridge_in_Arashiyama.jpg', caption: 'Togetsukyō Bridge, Arashiyama' }
      ]
    }
  ],
  'n04': [
    {
      id: 'l-n04-a', title: 'Mt. Fuji 5th Station', icon: '🗻', cat: 'nature',
      sub: 'Yamanashi • Fujinomiya',
      desc: 'The staging point for summit climbs. Dramatic views of the crater and surrounding plains below.',
      lat: 35.3606, lng: 138.7274,
      address: 'Funatsu, Fujikawaguchiko, Minamitsuru District, Yamanashi',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Mount_Fuji_from_Hotel_Mt_Fuji_1.jpg/1280px-Mount_Fuji_from_Hotel_Mt_Fuji_1.jpg', caption: 'Mt. Fuji from Lake Yamanaka' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Fuji_from_Shinkansen_N700.jpg/1280px-Fuji_from_Shinkansen_N700.jpg', caption: 'Fuji from the Shinkansen' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Fujisan_from_Nihondaira.jpg/1280px-Fujisan_from_Nihondaira.jpg', caption: 'Fuji from Nihondaira plateau' }
      ]
    }
  ],
  't01': [
    {
      id: 'l-t01-a', title: 'Urasenke Tea School', icon: '🍵', cat: 'ritual',
      sub: 'Kyoto • Urasenke',
      desc: "One of the three great Sen schools. Visitors may attend morning practice sessions in the historic teahouse garden.",
      lat: 35.0255, lng: 135.7487,
      address: 'Urasenke, Teranouchi-agaru, Ogawa-dori, Kamigyo Ward, Kyoto',
      images: [
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Urasenke_chashitsu.jpg/1280px-Urasenke_chashitsu.jpg', caption: 'Urasenke chashitsu (teahouse)' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Matcha_green_tea.jpg/1280px-Matcha_green_tea.jpg', caption: 'Ceremonial matcha bowl' },
        { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Urasenke_garden.jpg/1280px-Urasenke_garden.jpg', caption: 'Roji garden pathway' }
      ]
    }
  ]
};

/* ─── Fallback generator for cards without hardcoded locations ─── */
function getLocationsForCard(itemId, title, cat) {
  if (locationsDB[itemId]) return locationsDB[itemId];

  // Generate two sensible fallbacks with plausible coordinates
  const coords = {
    culture: { lat: 35.6762, lng: 139.6503 },  // Tokyo
    cuisine: { lat: 34.6937, lng: 135.5023 },  // Osaka
    craft:   { lat: 35.0116, lng: 135.7681 },  // Kyoto
    nature:  { lat: 35.3606, lng: 138.7274 },  // Fuji area
    ritual:  { lat: 35.0116, lng: 135.7681 }   // Kyoto
  };
  const c = coords[cat] || coords.culture;

  return [
    {
      id: `l-${itemId}-1`, title: `${title} — Tokyo`, icon: '📍', cat,
      sub: 'Tokyo • Specialty', desc: `Discover authentic ${title.toLowerCase()} in the heart of the capital.`,
      lat: c.lat, lng: c.lng, address: 'Tokyo, Japan',
      images: getPlaceholderImages(title)
    },
    {
      id: `l-${itemId}-2`, title: `${title} — Kyoto`, icon: '⛩️', cat,
      sub: 'Kyoto • Heritage', desc: `Experience the deep roots of ${title.toLowerCase()} in a historically preserved setting.`,
      lat: 35.0116, lng: 135.7681, address: 'Kyoto, Japan',
      images: getPlaceholderImages(title)
    }
  ];
}

function getPlaceholderImages(title) {
  // Returns placeholder objects — real images would come from DB/CDN in production
  return [
    { src: null, caption: `${title} — Location photo 1` },
    { src: null, caption: `${title} — Location photo 2` },
    { src: null, caption: `${title} — Location photo 3` }
  ];
}

/* ═══════════════════════════════════════════
   REVIEWS STORE (in-memory; POST/GET via server.js in production)
═══════════════════════════════════════════ */
const reviewsStore = {}; // locationId → array of review objects

/* Seed reviews */
const seedReviews = {
  'l-c01-a': [
    { id: 'r001', author: 'TokyoTraveler', rating: 5, text: 'The sheer variety is overwhelming in the best way. Found flavours I never knew existed.', date: '2025-09-14' },
    { id: 'r002', author: 'OsakaWanderer', rating: 4, text: 'Go straight to the snack floor. Skip the escalator queue — use the stairs.', date: '2025-11-01' }
  ],
  'l-c03-a': [
    { id: 'r003', author: 'WhiskyNomad', rating: 5, text: 'The oak warehouse walk is worth the trip alone. Book the premium tasting.', date: '2024-12-08' }
  ],
  'l-q01-a': [
    { id: 'r004', author: 'GastroKyoto', rating: 5, text: 'Reserve 3 months out minimum. The rice temperature alone will change how you think about sushi.', date: '2025-02-20' }
  ]
};
Object.assign(reviewsStore, seedReviews);

/* ═══════════════════════════════════════════
   API LAYER (mirrors api.js; self-contained for index.html)
═══════════════════════════════════════════ */
const API_BASE = 'http://localhost:3000/api';

const authState = {
  getToken:        () => localStorage.getItem('komorebi_jwt'),
  setToken:   (t) => localStorage.setItem('komorebi_jwt', t),
  clearToken:      () => localStorage.removeItem('komorebi_jwt'),
  getUsername:     () => localStorage.getItem('komorebi_user'),
  setUsername:(u) => localStorage.setItem('komorebi_user', u),
  clearUsername:   () => localStorage.removeItem('komorebi_user'),
  isLoggedIn:      () => !!localStorage.getItem('komorebi_jwt'),
  logout() {
    this.clearToken();
    this.clearUsername();
    updateAuthUI();
  }
};

async function apiLogin(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
  const data = await res.json();
  authState.setToken(data.token);
  authState.setUsername(username);
  return data;
}

async function apiSignup(username, email, password) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  if (!res.ok) throw new Error((await res.json()).error || 'Signup failed');
  const data = await res.json();
  authState.setToken(data.token);
  authState.setUsername(username);
  return data;
}

async function apiFetchBookmarks() {
  const res = await fetch(`${API_BASE}/bookmarks`, {
    headers: { 'Authorization': `Bearer ${authState.getToken()}` }
  });
  return res.json();
}

async function apiToggleBookmark(locationId) {
  const res = await fetch(`${API_BASE}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.getToken()}`
    },
    body: JSON.stringify({ locationId })
  });
  return res.json();
}

async function apiFetchReviews(locationId) {
  try {
    const res = await fetch(`${API_BASE}/reviews/${locationId}`, {
      headers: { 'Authorization': `Bearer ${authState.getToken()}` }
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function apiPostReview(locationId, rating, text) {
  const res = await fetch(`${API_BASE}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authState.getToken()}`
    },
    body: JSON.stringify({ locationId, rating, text })
  });
  return res.json();
}

/* ═══════════════════════════════════════════
   PAGE ROUTER
═══════════════════════════════════════════ */
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('is-active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('is-active'));

  const target = document.getElementById('page-' + name);
  if (target) target.classList.add('is-active');

  const link = document.querySelector(`.nav-link[data-page="${name}"]`);
  if (link) link.classList.add('is-active');

  if (name === 'bookmarks') renderBookmarkGrid();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ═══════════════════════════════════════════
   TAB NAVIGATION
═══════════════════════════════════════════ */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const panel = document.getElementById(targetId);
    if (!panel) return;

    const nav = btn.closest('.tabs__nav');
    nav.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });

    const panelsParent = panel.parentElement;
    panelsParent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('is-active'));

    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');
    panel.classList.add('is-active');
  });

  btn.addEventListener('keydown', e => {
    const btns = [...btn.closest('.tabs__nav').querySelectorAll('.tab-btn')];
    const idx = btns.indexOf(btn);
    if (e.key === 'ArrowRight') btns[(idx + 1) % btns.length].click();
    if (e.key === 'ArrowLeft')  btns[(idx - 1 + btns.length) % btns.length].click();
  });
});

/* ═══════════════════════════════════════════
   DISCOVER CARDS → LOCATION PAGE
═══════════════════════════════════════════ */
document.querySelectorAll('.page#page-home .card').forEach(card => {
  card.addEventListener('click', () => {
    const itemId    = card.dataset.bkId;
    const itemTitle = card.dataset.bkTitle;
    const itemCat   = card.dataset.bkCat;

    document.getElementById('loc-title').textContent = itemTitle;

    const grid = document.getElementById('loc-grid');
    grid.innerHTML = '';

    const locations = getLocationsForCard(itemId, itemTitle, itemCat);
    locations.forEach(loc => renderLocationCard(loc, grid));

    showPage('locations');
  });
});

/* ─── Render a single location card ─── */
function renderLocationCard(loc, container) {
  const isSaved = bookmarks.has(loc.id);
  const article = document.createElement('article');
  article.className = 'card';
  article.innerHTML = `
    <div class="card__watermark" aria-hidden="true">${loc.icon}</div>
    <button class="card__bk-btn ${isSaved ? 'is-saved' : ''}" title="Save Location" data-loc-id="${loc.id}">
      <span class="bk-icon"></span>
    </button>
    <div class="card__body">
      <span class="card__icon">${loc.icon}</span>
      <p class="card__tag">${loc.sub}</p>
      <h2 class="card__title">${loc.title}</h2>
      <p class="card__desc">${loc.desc}</p>
      <button class="card__map-btn" data-loc-id="${loc.id}">
        🗺 View on Map
      </button>
    </div>
  `;

  // "View on Map" → opens modal to map tab
  article.querySelector('.card__map-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    openLocationModal(loc, 'mtab-map');
  });

  // Card body click → gallery tab
  article.addEventListener('click', (e) => {
    if (e.target.closest('.card__bk-btn') || e.target.closest('.card__map-btn')) return;
    openLocationModal(loc, 'mtab-gallery');
  });

  // Bookmark button
  const bkBtn = article.querySelector('.card__bk-btn');
  bkBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleBookmarkOptimistic(loc, bkBtn);
  });

  container.appendChild(article);
}

/* ─── Optimistic bookmark toggle ─── */
function toggleBookmarkOptimistic(loc, btn) {
  const alreadySaved = bookmarks.has(loc.id);

  // Immediate UI update
  if (alreadySaved) {
    bookmarks.delete(loc.id);
    btn.classList.remove('is-saved');
    showToast(`Removed "${loc.title}"`);
  } else {
    bookmarks.set(loc.id, loc);
    btn.classList.add('is-saved');
    showToast(`Saved "${loc.title}" ♥`);
  }
  updateBadge();

  // Sync with server if logged in (fire-and-forget with rollback on error)
  if (authState.isLoggedIn()) {
    apiToggleBookmark(loc.id).catch(() => {
      // Revert optimistic update
      if (alreadySaved) {
        bookmarks.set(loc.id, loc);
        btn.classList.add('is-saved');
      } else {
        bookmarks.delete(loc.id);
        btn.classList.remove('is-saved');
      }
      updateBadge();
      showToast('Sync failed — please retry');
    });
  }
}

/* ═══════════════════════════════════════════
   LOCATION MODAL — Gallery + Map + Reviews
═══════════════════════════════════════════ */
function openLocationModal(loc, defaultTab = 'mtab-gallery') {
  currentLoc = loc;
  reviewRating = 0;

  // Set header
  document.getElementById('modal-loc-title').textContent = loc.title;
  document.getElementById('modal-loc-sub').textContent = loc.sub;

  // Switch to requested tab
  switchModalTab(defaultTab);

  // Populate each panel
  populateGallery(loc);
  populateMap(loc);
  populateReviews(loc.id);

  // Open overlay
  document.getElementById('location-modal').classList.add('is-active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('is-active');
  document.body.style.overflow = '';
  if (id === 'location-modal') closeLightbox();
}

/* Close on overlay click */
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal(overlay.id);
  });
});

/* Modal tab switching */
document.querySelectorAll('.modal-tab').forEach(tab => {
  tab.addEventListener('click', () => switchModalTab(tab.dataset.modalTarget));
});

function switchModalTab(targetId) {
  document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('is-active'));
  document.querySelectorAll('.modal-panel').forEach(p => p.classList.remove('is-active'));

  const tab = document.querySelector(`.modal-tab[data-modal-target="${targetId}"]`);
  if (tab) tab.classList.add('is-active');

  const panel = document.getElementById(targetId);
  if (panel) panel.classList.add('is-active');

  // Leaflet needs invalidateSize after becoming visible
  if (targetId === 'mtab-map' && leafletMap) {
    requestAnimationFrame(() => leafletMap.invalidateSize());
  }
}

/* ─── GALLERY ─── */
function populateGallery(loc) {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  lbImages = loc.images || [];

  lbImages.forEach((img, idx) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';

    if (img.src) {
      item.innerHTML = `
        <img src="${img.src}" alt="${img.caption}" loading="lazy" />
        <div class="gallery-overlay">
          <span class="gallery-overlay__label">${img.caption}</span>
        </div>
      `;
    } else {
      item.innerHTML = `
        <div class="gallery-placeholder">
          <div class="gallery-placeholder__icon">📷</div>
          <div class="gallery-placeholder__label">Researcher Upload Pending</div>
        </div>
      `;
    }

    if (img.src) {
      item.addEventListener('click', () => openLightbox(idx));
    }
    grid.appendChild(item);
  });

  // Researcher badge
  const badge = document.createElement('p');
  badge.className = 'gallery-researcher-badge';
  badge.textContent = `Researcher's Gallery · ${lbImages.length} photos`;
  grid.after(badge);
}

/* ─── LIGHTBOX ─── */
function openLightbox(idx) {
  lbIndex = idx;
  const lb = document.getElementById('gallery-lightbox');
  lb.classList.add('is-active');
  renderLightboxSlide();
}

function closeLightbox() {
  document.getElementById('gallery-lightbox').classList.remove('is-active');
}

function renderLightboxSlide() {
  const img = lbImages[lbIndex];
  if (!img || !img.src) return;
  document.getElementById('lightbox-img').src = img.src;
  document.getElementById('lightbox-img').alt = img.caption;
  document.getElementById('lightbox-caption').textContent = `${img.caption} · ${lbIndex + 1} / ${lbImages.length}`;
}

document.getElementById('lb-prev').addEventListener('click', () => {
  lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
  renderLightboxSlide();
});
document.getElementById('lb-next').addEventListener('click', () => {
  lbIndex = (lbIndex + 1) % lbImages.length;
  renderLightboxSlide();
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('gallery-lightbox');
  if (!lb.classList.contains('is-active')) return;
  if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; renderLightboxSlide(); }
  if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbImages.length; renderLightboxSlide(); }
  if (e.key === 'Escape')     closeLightbox();
});

// Close modal on Escape
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (document.getElementById('location-modal').classList.contains('is-active') &&
      !document.getElementById('gallery-lightbox').classList.contains('is-active')) {
    closeModal('location-modal');
  }
  if (document.getElementById('auth-modal').classList.contains('is-active')) {
    closeModal('auth-modal');
  }
});

/* ─── MAP (Leaflet.js) ─── */
function populateMap(loc) {
  const mapInfo = document.getElementById('map-info-label');
  const gmapsLink = document.getElementById('map-gmaps-link');

  mapInfo.textContent = `${loc.address} · ${loc.lat.toFixed(4)}°N, ${loc.lng.toFixed(4)}°E`;
  gmapsLink.href = `https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`;

  // First-time init
  if (!leafletMap) {
    leafletMap = L.map('leaflet-map', {
      zoomControl: true,
      scrollWheelZoom: false
    });
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd', maxZoom: 19
    }).addTo(leafletMap);
  }

  // Custom crimson marker
  const crimsonIcon = L.divIcon({
    className: '',
    html: `<div style="
      width:18px;height:18px;background:#c0392b;border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);border:2px solid #fff;
      box-shadow:0 2px 8px rgba(192,57,43,.5);
    "></div>`,
    iconSize: [18, 18], iconAnchor: [9, 18]
  });

  if (leafletMarker) leafletMarker.remove();
  leafletMarker = L.marker([loc.lat, loc.lng], { icon: crimsonIcon })
    .addTo(leafletMap)
    .bindPopup(`<strong>${loc.title}</strong><br><small>${loc.sub}</small>`);

  leafletMap.setView([loc.lat, loc.lng], 15);
  leafletMarker.openPopup();
}

/* ─── REVIEWS ─── */
async function populateReviews(locationId) {
  const list = document.getElementById('reviews-list');
  list.innerHTML = '';

  // Try fetching from server; fall back to local store
  let reviews = null;
  if (authState.isLoggedIn()) {
    reviews = await apiFetchReviews(locationId);
  }
  if (!reviews) reviews = reviewsStore[locationId] || [];

  if (reviews.length === 0) {
    list.innerHTML = `
      <div class="reviews-empty">
        <div class="reviews-empty__icon">💬</div>
        <p class="reviews-empty__text">No reviews yet. Be the first to share your experience.</p>
      </div>
    `;
  } else {
    reviews.forEach(r => list.appendChild(buildReviewEl(r)));
  }

  // Update compose avatar
  const username = authState.getUsername() || '?';
  document.getElementById('review-avatar').textContent = username[0].toUpperCase();

  // Reset compose state
  document.getElementById('review-input').value = '';
  reviewRating = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('is-lit'));
}

function buildReviewEl(review, optimistic = false) {
  const el = document.createElement('div');
  el.className = `review-item${optimistic ? ' review-item--optimistic' : ''}`;
  el.dataset.reviewId = review.id;
  const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
  el.innerHTML = `
    <div class="review-avatar">${review.author[0].toUpperCase()}</div>
    <div class="review-body">
      <div class="review-meta">
        <span class="review-author">${review.author}</span>
        <span class="review-stars">${stars}</span>
        <span class="review-date">${review.date || formatDate(new Date())}</span>
      </div>
      <p class="review-text">${review.text}</p>
    </div>
  `;
  return el;
}

/* Star picker interaction */
document.querySelectorAll('.star').forEach(star => {
  const val = parseInt(star.dataset.val);

  star.addEventListener('mouseenter', () => {
    document.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('is-lit', parseInt(s.dataset.val) <= val);
    });
  });

  star.addEventListener('mouseleave', () => {
    document.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('is-lit', parseInt(s.dataset.val) <= reviewRating);
    });
  });

  star.addEventListener('click', () => {
    reviewRating = val;
    document.querySelectorAll('.star').forEach(s => {
      s.classList.toggle('is-lit', parseInt(s.dataset.val) <= reviewRating);
    });
  });
});

async function submitReview() {
  if (!currentLoc) return;

  if (!authState.isLoggedIn()) {
    openAuthModal();
    showToast('Please log in to post a review');
    return;
  }

  const input  = document.getElementById('review-input');
  const text   = input.value.trim();
  const rating = reviewRating || 5;

  if (!text) { showToast('Write something first'); return; }

  const optimisticReview = {
    id: `opt-${Date.now()}`,
    author: authState.getUsername() || 'You',
    rating, text, date: formatDate(new Date())
  };

  // Optimistic insert
  const list = document.getElementById('reviews-list');
  const empty = list.querySelector('.reviews-empty');
  if (empty) list.innerHTML = '';
  const el = buildReviewEl(optimisticReview, true);
  list.prepend(el);

  // Clear compose
  input.value = '';
  reviewRating = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('is-lit'));

  // Store locally
  if (!reviewsStore[currentLoc.id]) reviewsStore[currentLoc.id] = [];
  reviewsStore[currentLoc.id].unshift(optimisticReview);

  // Sync to server
  try {
    const result = await apiPostReview(currentLoc.id, rating, text);
    // Resolve optimistic
    el.classList.remove('review-item--optimistic');
    el.dataset.reviewId = result.id || optimisticReview.id;
    showToast('Review posted ✓');
  } catch {
    // Revert
    el.remove();
    reviewsStore[currentLoc.id].shift();
    input.value = text;
    showToast('Failed to post review — try again');
  }
}

function formatDate(d) {
  return d.toISOString().split('T')[0];
}

/* ═══════════════════════════════════════════
   AUTH MODAL
═══════════════════════════════════════════ */
let authMode = 'login'; // 'login' | 'signup'

function openAuthModal() {
  setAuthMode('login');
  document.getElementById('auth-username').value = '';
  document.getElementById('auth-password').value = '';
  document.getElementById('auth-email').value = '';
  document.getElementById('auth-error').style.display = 'none';
  document.getElementById('auth-modal').classList.add('is-active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('auth-username').focus(), 120);
}

function setAuthMode(mode) {
  authMode = mode;
  const isLogin = mode === 'login';

  document.getElementById('auth-login-tab').classList.toggle('is-active', isLogin);
  document.getElementById('auth-signup-tab').classList.toggle('is-active', !isLogin);
  document.getElementById('auth-modal-title').textContent = isLogin ? 'Welcome Back' : 'Create Account';
  document.getElementById('auth-sub').textContent = isLogin
    ? 'Sign in to sync your saved locations.'
    : 'Join to save and share your discoveries.';
  document.getElementById('auth-submit-label').textContent = isLogin ? 'Sign In' : 'Create Account';
  document.getElementById('auth-email-group').style.display = isLogin ? 'none' : 'block';
  document.getElementById('auth-error').style.display = 'none';
  document.getElementById('auth-password').setAttribute('autocomplete', isLogin ? 'current-password' : 'new-password');
}

async function handleAuthSubmit() {
  const btn     = document.getElementById('auth-submit-btn');
  const label   = document.getElementById('auth-submit-label');
  const spinner = document.getElementById('auth-spinner');
  const errEl   = document.getElementById('auth-error');
  const username = document.getElementById('auth-username').value.trim();
  const password = document.getElementById('auth-password').value;

  if (!username || !password) {
    showAuthError('Please fill in all fields.'); return;
  }

  // Loading state
  btn.disabled = true;
  label.style.display = 'none';
  spinner.style.display = 'inline';
  errEl.style.display = 'none';

  try {
    if (authMode === 'login') {
      await apiLogin(username, password);
    } else {
      const email = document.getElementById('auth-email').value.trim();
      if (!email) { showAuthError('Email is required.'); return; }
      await apiSignup(username, email, password);
    }

    // Success
    closeModal('auth-modal');
    updateAuthUI();
    showToast(`Welcome, ${username} ✓`);

    // Sync server bookmarks if any local ones exist
    if (bookmarks.size > 0) syncBookmarksToServer();

  } catch (err) {
    showAuthError(err.message || 'Something went wrong. Please retry.');
  } finally {
    btn.disabled = false;
    label.style.display = 'inline';
    spinner.style.display = 'none';
  }
}

function showAuthError(msg) {
  const errEl = document.getElementById('auth-error');
  errEl.textContent = msg;
  errEl.style.display = 'block';
}

function togglePasswordVisibility() {
  const pw = document.getElementById('auth-password');
  pw.type = pw.type === 'password' ? 'text' : 'password';
}

/* ─── Update global UI after auth state change ─── */
function updateAuthUI() {
  const btn   = document.getElementById('nav-auth-btn');
  const label = btn.querySelector('.auth-btn-label');

  if (authState.isLoggedIn()) {
    const username = authState.getUsername() || 'Profile';
    label.textContent = username[0].toUpperCase() + username.slice(1);
    btn.classList.add('is-logged-in');
    btn.title = 'Click to sign out';
    btn.onclick = () => {
      authState.logout();
      showToast('Signed out');
    };
    // Update review avatar
    document.getElementById('review-avatar').textContent = username[0].toUpperCase();
  } else {
    label.textContent = 'Login';
    btn.classList.remove('is-logged-in');
    btn.title = '';
    btn.onclick = openAuthModal;
  }
}

/* ─── Sync local bookmarks → server after login ─── */
async function syncBookmarksToServer() {
  for (const [id] of bookmarks) {
    try { await apiToggleBookmark(id); } catch { /* no-op */ }
  }
}

/* ═══════════════════════════════════════════
   BOOKMARK PAGE
═══════════════════════════════════════════ */
document.querySelectorAll('.bk-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.bk-filter-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    bkFilter = btn.dataset.bkFilter;
    renderBookmarkGrid();
  });
});

function renderBookmarkGrid() {
  const grid  = document.getElementById('bk-grid');
  const empty = document.getElementById('bk-empty');

  const filtered = [...bookmarks.entries()].filter(([, loc]) =>
    bkFilter === 'all' || loc.cat === bkFilter
  );

  grid.querySelectorAll('.bk-card').forEach(c => c.remove());

  if (filtered.length === 0) {
    empty.style.display = '';
    return;
  }
  empty.style.display = 'none';

  filtered.forEach(([id, loc]) => {
    const card = document.createElement('article');
    card.className = 'bk-card';
    card.innerHTML = `
      <div class="bk-card__watermark" aria-hidden="true">${loc.icon}</div>
      <span class="bk-card__cat-badge">${loc.sub.split(' • ')[0]}</span>
      <span class="bk-card__icon">${loc.icon}</span>
      <h3 class="bk-card__title">${loc.title}</h3>
      <p class="bk-card__sub">${loc.desc}</p>
      <button class="bk-card__remove" data-remove-id="${id}">✕ Remove</button>
    `;
    // Click card → re-open in modal
    card.addEventListener('click', (e) => {
      if (e.target.closest('.bk-card__remove')) return;
      openLocationModal(loc, 'mtab-gallery');
    });
    grid.appendChild(card);
  });

  grid.querySelectorAll('.bk-card__remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.removeId;
      bookmarks.delete(id);
      updateBadge();
      renderBookmarkGrid();
      if (authState.isLoggedIn()) apiToggleBookmark(id).catch(() => {});
      showToast('Removed from saved locations');
    });
  });
}

/* ═══════════════════════════════════════════
   UTILITIES
═══════════════════════════════════════════ */
function updateBadge() {
  document.getElementById('global-bk-count').textContent = bookmarks.size;
}

function showToast(msg) {
  if (toastTimer) clearTimeout(toastTimer);
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('is-visible');
  toastTimer = setTimeout(() => t.classList.remove('is-visible'), 2600);
}

function handleFormSubmit(e) {
  e.preventDefault();
  showToast('Message sent — thank you! ✉');
  e.target.reset();
}

/* ─── Logo keyboard nav ─── */
document.querySelector('.nav-logo').addEventListener('keydown', e => {
  if (e.key === 'Enter') showPage('home');
});

/* ═══════════════════════════════════════════
   INIT
═══════════════════════════════════════════ */
updateAuthUI();