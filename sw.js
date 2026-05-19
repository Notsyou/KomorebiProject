const CACHE_NAME = 'komorebi-cache-v1';
const MAP_CACHE = 'komorebi-map-tiles';

// The core files needed to load the site offline
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;700;900&family=Inter:wght@300;400;500;600&display=swap',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css',
  'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js'
];

// Install: Cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME && key !== MAP_CACHE)
          .map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

// Fetch: Intercept requests
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // 1. Let API calls go to the network (don't cache dynamic database data)
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // 2. Cache Map Tiles dynamically (CartoDB)
  if (url.hostname.includes('cartocdn.com')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then(networkResponse => {
          return caches.open(MAP_CACHE).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => console.log('Offline: Could not load map tile.'));
      })
    );
    return;
  }

  // 3. Cache-First for everything else (HTML, CSS, JS, Images)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request).catch(() => {
        // Fallback if totally offline and not cached
        console.log('Offline: Resource unavailable.');
      });
    })
  );
});