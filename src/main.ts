import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { registerServiceWorker } from './registerServiceWorker';

registerServiceWorker();

const app = createApp(App);

app.use(router);

app.mount('#app');