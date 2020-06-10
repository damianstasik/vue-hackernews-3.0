import { createRouter, createWebHistory } from 'vue-router'

// route-level code splitting
const createListView = id => () => import('../views/CreateListView').then(m => m.default(id))
const ItemView = () => import('../views/ItemView.vue')
const UserView = () => import('../views/UserView.vue')

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { name: 'top', path: '/top/:page(\\d+)?', component: createListView('top') },
    { name: 'new', path: '/new/:page(\\d+)?', component: createListView('new') },
    { name: 'show', path: '/show/:page(\\d+)?', component: createListView('show') },
    { name: 'ask', path: '/ask/:page(\\d+)?', component: createListView('ask') },
    { name: 'job', path: '/job/:page(\\d+)?', component: createListView('job') },
    { name: 'item', path: '/item/:id(\\d+)', component: ItemView },
    { name: 'user', path: '/user/:id', component: UserView },
    { path: '/', redirect: '/top' }
  ]
})
