const CACHE_NAME = "tabiji-cache-v4";

const BASE_PATH = "/TP3_PicheTristan/";

const FILES_TO_CACHE = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}apropos.html`,
  `${BASE_PATH}contact.html`,
  `${BASE_PATH}reservation.html`,
  `${BASE_PATH}manifest.json`,
  `${BASE_PATH}offline.html`,
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

        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Erreur pendant la création du cache :", error);
      }),
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activé");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("Ancien cache supprimé :", cacheName);

              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        return self.clients.claim();
      }),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();

            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }

          return networkResponse;
        })
        .catch(() => {
          if (event.request.mode === "navigate") {
            return caches.match(`${BASE_PATH}offline.html`);
          }
        });
    }),
  );
});
