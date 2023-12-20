import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

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

const app = createApp(App);

app.use(router);

app.mount('#app');