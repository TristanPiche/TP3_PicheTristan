const CACHE_NAME = "tabiji-cache-v3";

const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/apropos.html",
  "/contact.html",
  "/reservation.html",
  "/manifest.json",
  "/offline.html",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installé");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Cache ouvert :", CACHE_NAME);

        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
        console.log("Tous les fichiers ont été ajoutés au cache");
      })
      .catch((error) => {
        console.error("Erreur pendant la création du cache :", error);
      }),
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activé");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("Ancien cache supprimé :", cacheName);
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (
            event.request.method === "GET" &&
            networkResponse &&
            networkResponse.status === 200
          ) {
            const responseClone = networkResponse.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }

          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        });
    }),
  );
});
