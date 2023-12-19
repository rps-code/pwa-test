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
