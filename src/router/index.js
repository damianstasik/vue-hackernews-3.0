import { createRouter, createWebHistory } from 'vue-router';

// route-level code splitting
const ItemList = () => import('../views/ItemList.vue');
const ItemView = () => import('../views/ItemView.vue');
const UserView = () => import('../views/UserView.vue');

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'top',
      path: '/top/:page(\\d+)?',
      component: ItemList,
      meta: { type: 'top' },
    },
    {
      name: 'new',
      path: '/new/:page(\\d+)?',
      component: ItemList,
      meta: { type: 'new' },
    },
    {
      name: 'show',
      path: '/show/:page(\\d+)?',
      component: ItemList,
      meta: { type: 'show' },
    },
    {
      name: 'ask',
      path: '/ask/:page(\\d+)?',
      component: ItemList,
      meta: { type: 'ask' },
    },
    {
      name: 'job',
      path: '/job/:page(\\d+)?',
      component: ItemList,
      meta: { type: 'job' },
    },
    {
      name: 'item',
      path: '/item/:id(\\d+)',
      component: ItemView,
    },
    {
      name: 'user',
      path: '/user/:id',
      component: UserView,
    },
    {
      path: '/',
      redirect: '/top',
    },
  ],
});
