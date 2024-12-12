import Vue from 'vue';
import VueRouter from 'vue-router';

import shopRoutes from './shop.router';
import bankRoutes from './bank.router';
import HomeView from '../views/HomeView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  ...shopRoutes,
  ...bankRoutes,
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (from.name === null && to.path !== '/home') {
    next('/home');
  } else {
    next();
  }
});

export default router;
