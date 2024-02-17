const cacheName = "rally-v2";

const contentToCache = [
    "/index.html",
    "/about.html",
    "/rally.html",
    "/js/background.js",
    "/js/controls.js",
    "/js/index.js"
];

//Installation
self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
        (async () => {
          const cache = await caches.open(cacheName);
          console.log("[Service Worker] Caching all: app shell and content");
          await cache.addAll(contentToCache);
        })(),
      );
  });

  //Responding to fetches (Getting Cached Data)
  self.addEventListener("fetch", (e) => {
    e.respondWith(
      (async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) {
          return r;
        }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
      })(),
    );
  });

  //Clear Old Cache
  self.addEventListener("activate", (e) => {
    e.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(
          keyList.map((key) => {
            if (key === cacheName) {
              return;
            }
            return caches.delete(key);
          }),
        );
      }),
    );
  });
  
  