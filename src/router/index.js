import Vue from 'vue';
import VueRouter from 'vue-router';
import VirusesView from '../views/VirusesView.vue';
import ShopView from '../views/ShopView.vue';
import ShopHome from '../views/ShopHome.vue';
import ShopBuy from '../views/ShopBuy.vue';
import ShopPay from '../views/ShopPay.vue';
import ShopOrders from '../views/ShopOrders.vue';
import ShopLoginView from "@/views/ShopLoginView.vue";
import store from '../store'; // Import the Vuex store

Vue.use(VueRouter);

const routes = [
  {
    path: '/shop',
    component: ShopView,
    children: [
      {
        path: 'home',
        name: 'shophome',
        components: {
          shopmain: ShopHome,
        },
        alias: ''
      },
      {
        path: 'login',
        name: 'shoplogin',
        components: {
          shopmain: ShopLoginView,
        },
      },
      {
        path: 'buy',
        name: 'shopbuy',
        components: {
          shopmain: ShopBuy,
        }
      },
      {
        path: 'pay/:orderId',
        name: 'shoppay',
        components: {
          shopmain: ShopPay,
        },
        props: route => ({ orderId: route.params.orderId })
      },
      {
        path: 'orders',
        name: 'shoporders',
        components: {
          shopmain: ShopOrders,
        },
      }
    ]
  },
  {
    path: '/shop/items',
    name: 'shopitems',
    component: VirusesView,
  },
  {
    path: '/bank/account',
    name: 'bankaccount',
    component: () => import('../views/BankAccountView.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (!store.state.shop.shopUser && to.name !== 'shophome' && to.name !== 'shoplogin') {
    next({ name: 'shophome' });
  } else {
    next();
  }
});

export default router;