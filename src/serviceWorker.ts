export function registerServiceWorker() {
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
		navigator.serviceWorker.register('/src/serviceWorker.ts')
			.then(registration => {
				console.log('SW registered:', registration);
			}).catch(registrationError => {
				console.log('SW registration failed:', registrationError);
			});
		});
	}
}

self.addEventListener('install', (event: any) => {
    console.log('Service Worker installing.', event);
});

self.addEventListener('fetch', (event: any) => {
    console.log('Fetching:', event.request.url);
});
