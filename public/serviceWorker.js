self.addEventListener('install', event => {
	console.log('Service Worker installing:', event);
});

self.addEventListener('fetch', event => {
	console.log('Fetching:', event.request.url);

    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
