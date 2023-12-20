import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/serviceWorker.js').then(registration => {
			console.log('SW registered: ', registration);
		}).catch(registrationError => {
			console.error('SW registration failed: ', registrationError);
		});
	});
}

app.use(router);

app.mount('#app');