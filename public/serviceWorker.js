const cacheName = 'pwa-test-v4';

self.addEventListener('install', event => {
	// skipWaiting bypasses the SW waiting stage after it has been installed. It allows the new service worker to take instant control. By skipping this phase we ensure updates to assets are activated as soon as they are available, rather than waiting for an old service worker to finish. @todo: Research more about this.
	// event.waitUntil(self.skipWaiting())
	console.log(event);
});

// Cache versioning.
self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(keys => {
			// Takes the array of promises and once each promise resolves it resolves the .then promise for .keys() once as it only expects one promise.
			return Promise.all(keys
				// If the stored cache name is not equal to the current cache name.
				.filter(key => key !== cacheName)
				// Delete the cache (we're returning a new array of promises here, which will then make Promises.all return one promise back).
				.map(key => caches.delete(key))
			);
		})
	);
})

self.addEventListener('fetch', (event) => {
	console.log('Fetch:', event.request.url);

	event.respondWith(
		// Match the current fetch event with ones in the cache.
		caches.match(event.request).then((response) => {
			// If the response is not empty (we have something in the cache for this) then return the cached response, if not then attempt the fetch request to the server.
			return response || fetch(event.request);
		})
	);
});

self.addEventListener('message', (event) => {
    if (event.data.type === 'cacheUrls') {
        event.waitUntil(
            caches.open(cacheName).then((cache) => {
				console.log('Caching all:', event.data.payload);
				return cache.addAll(event.data.payload);
			})
        );
    }
});