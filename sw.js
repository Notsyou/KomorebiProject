const CACHE_NAME = 'komorebi-cache-v3';
const MAP_CACHE = 'komorebi-map-tiles';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300,400,700,900&family=Inter:wght@300,400,500,600&display=swap',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css',
  'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  'https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js'
];

// Install: Cache assets safely and ignore failed/blocked CDN requests
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      const cachePromises = ASSETS_TO_CACHE.map(url => {
        const request = url.startsWith('http') 
          ? new Request(url, { mode: 'no-cors' }) 
          : new Request(url);
          
          return fetch(request)
          .then(response => {
            // Only cache valid responses — never cache undefined or error responses
            if (!response || response.type === 'error') return;
            return cache.put(url, response);
          })
          .catch(err => console.warn(`Skipped caching: ${url}`, err));
      });
      return Promise.all(cachePromises);
    })
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

  // 1. Let API calls go to the network
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // 👇 ADD THIS NEW CHECK: Ignore Google Fonts entirely
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    return; 
  }

  // 2. Map tiles logic
  if (url.hostname.includes('cartocdn.com')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then(networkResponse => {
          return caches.open(MAP_CACHE).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => new Response('', { status: 503, statusText: 'Offline' }));
      })
    );
    return;
  }

  // 3. Cache-first fallback for everything else (including manifest)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request).catch(() => {
        return new Response('Offline content not available', { status: 503, statusText: 'Offline' });
      });
    })
  );
});