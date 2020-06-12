import { createApp } from 'vue';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import { store } from './store';
import { router } from './router';
import titleMixin from './util/title';
import ProgressBar from './components/ProgressBar.vue';

const app = createApp(App);

// mixin for handling title
app.mixin(titleMixin);

sync(store, router);

app.use(router);
app.use(store);

app.use((app) => {
  // global progress bar
  app.config.globalProperties.$bar = createApp(ProgressBar).mount('#bar');
});

app.mount('#app');
