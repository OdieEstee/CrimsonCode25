/// <reference lib="webworker" />
var CACHE_NAME = "pwa-cache-v1";
var ASSETS_TO_CACHE = [
    "/", // Cache the root
    "/index.html",
    "/src/App.css",
    "/src/index.css",
    "/src/main.css",
    "/src/vite-env.d.ts",
    "/service-worker.ts",
];
self.addEventListener("install", function (event) {
    console.log("Service Worker installing...");
    event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
        return cache.addAll(ASSETS_TO_CACHE);
    }));
    self.skipWaiting();
});
self.addEventListener("activate", function (event) {
    console.log("Service Worker activated.");
    self.clients.claim();
});
// Intercept fetch requests and serve from cache if offline
self.addEventListener('fetch', function (event) {
    event.respondWith(caches.match(event.request).then(function (cachedResponse) {
        if (cachedResponse) {
            console.log("Serving from cache:", event.request.url);
            return cachedResponse; // Serve from cache
        }
        // If not cached, fetch from network
        return fetch(event.request).then(function (networkResponse) {
            return caches.open(CACHE_NAME).then(function (cache) {
                cache.put(event.request, networkResponse.clone()); // Cache the new response
                console.log("Fetching from network:", event.request.url);
                return networkResponse; // Return the network response
            });
        });
    }));
});
