self.addEventListener('install', e=>{
  e.waitUntil(caches.open('ttscore-v1').then(c=>c.addAll([
    './','./index.html','./manifest.webmanifest'
  ])));
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
