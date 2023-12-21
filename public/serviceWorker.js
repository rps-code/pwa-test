const cacheName = 'PWA-TEST';

self.addEventListener('install', event => {
	event.waitUntil(
		event.waitUntil(self.skipWaiting())
	);
});

self.addEventListener('fetch', (event) => {
	console.log('Fetch:', event.request.url);

	event.respondWith(
		caches.match(event.request).then((response) => {
			if (response) return response;

			return fetch(event.request);
		})
	);
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'cacheUrls') {
        event.waitUntil(
            caches.open(cacheName).then( (cache) => {
				console.log('Caching all:', event.data.payload)
				return cache.addAll(event.data.payload);
			})
        );
    }
});