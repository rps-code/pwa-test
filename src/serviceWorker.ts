self.addEventListener('install', (event: any) => {
    console.log('Service Worker installing.', event);
});

self.addEventListener('fetch', (event: any) => {
    console.log('Fetching:', event.request.url);
});
