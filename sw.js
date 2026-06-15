// sw.js - Service Worker tối giản dành cho PWA cài đặt nhanh
const CACHE_NAME = 'video-extractor-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// Kích hoạt và lưu đệm các tài nguyên cơ bản
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Bắt buộc phải có sự kiện fetch để trình duyệt công nhận PWA hợp lệ
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});


