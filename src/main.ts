import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
			const worker = registration.installing || registration.active;

			if (worker) {
				const data = {
					type: 'cacheUrls',
					payload: [
						location.href,
						...performance.getEntriesByType('resource').map(r => r.name)
					]
				};

				worker.postMessage(data);
				console.log('Posted cacheUrls', data);
			} else {
				console.log('No installing/active worker, so cacheUrls was not posted')
			}

			console.log('SW registered: ', registration);
		}).catch(registrationError => {
			console.error('SW registration failed: ', registrationError);
		});
	});
}

app.use(router);

app.mount('#app');