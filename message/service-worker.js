const CACHE_NAME = 'hhc-cache-20250528';
const urlsToCache = [
  './',
  './index.html',
  './hhc-icon-512.png',
  './manifest.json',
  './logo.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'https://code.jquery.com/jquery.js',
  'https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js',
  'https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css',
  'https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
