import { createRouter, createWebHistory } from 'vue-router';

// route-level code splitting
const ItemListRoute = () => import('./routes/ItemListRoute.vue');
const ItemView = () => import('./views/ItemView.vue');
const UserRoute = () => import('./routes/UserRoute.vue');

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'top',
      path: '/top/:page(\\d+)?',
      component: ItemListRoute,
      meta: {
        type: 'top',
      },
    },
    {
      name: 'new',
      path: '/new/:page(\\d+)?',
      component: ItemListRoute,
      meta: {
        type: 'new',
      },
    },
    {
      name: 'show',
      path: '/show/:page(\\d+)?',
      component: ItemListRoute,
      meta: {
        type: 'show',
      },
    },
    {
      name: 'ask',
      path: '/ask/:page(\\d+)?',
      component: ItemListRoute,
      meta: {
        type: 'ask',
      },
    },
    {
      name: 'job',
      path: '/job/:page(\\d+)?',
      component: ItemListRoute,
      meta: {
        type: 'job',
      },
    },
    {
      name: 'item',
      path: '/item/:id(\\d+)',
      component: ItemView,
      meta: {
        type: 'item',
      },
    },
    {
      name: 'user',
      path: '/user/:id',
      component: UserRoute,
      meta: {
        type: 'user',
      },
    },
    {
      path: '/',
      redirect: '/top',
    },
  ],
});
