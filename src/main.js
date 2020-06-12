import { createApp } from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import { store } from './store';
import { router } from './router';

const app = createApp(App);

sync(store, router);

app.use(router);
app.use(store);

app.mount('#app');
