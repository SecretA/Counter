const cacheName = 'digital-counter-v:2.0';
const filesToCache = [
  'index.html',
  'style.css',
  'script.js',
  'img/background.jpg',
  'img/counter_layout.png',
  'img/icon.png'
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(filesToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});