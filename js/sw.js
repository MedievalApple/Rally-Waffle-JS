const cacheName = "rally-v5";

const contentToCache = [
    "/index.html",
    "/about",
    "/rally",

    "/css/about.css",
    "/css/index.css",
    "/css/rally.css",

    "/js/background.js",
    "/js/controls.js",
    "/js/enemys.js",
    "/js/index.js",
    "/js/items.js",
    "/js/mapmanger.js",
    "/js/maps.js",
    "/js/mazesolver.js",
    "/js/minimap.js",
    "/js/player.js",
    "/js/rally.js",
    "/js/scoreboard.js",
    "/js/libs/joy.js",
    "/js/libs/utils.js",

    "/assets/enemy/enemy.png",
    "/assets/items/maple.png",
    "/assets/map/city.png",
    "/assets/map/citybw.png",
    "/assets/map/grass.png",
    "/assets/map/gray.png",
    "/assets/player/nelson.png",
    "/assets/player/player.png",
    "/assets/player/uwu.png",

    "/assets/road/000000010.png",
    "/assets/road/000001000.png",
    "/assets/road/000001010.png",
    "/assets/road/000100000.png",
    "/assets/road/000100010.png",
    "/assets/road/000101000.png",
    "/assets/road/000101010.png",
    "/assets/road/010000000.png",
    "/assets/road/010000010.png",
    "/assets/road/010001000.png",
    "/assets/road/010001010.png",
    "/assets/road/010100000.png",
    "/assets/road/010100010.png",
    "/assets/road/010101000.png",
    "/assets/road/010101010.png",

    "/assets/ui/gameover.png",

    "/assets/favicon.ico",

    "https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.js"
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
  
  