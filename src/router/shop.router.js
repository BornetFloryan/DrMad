import ShopView from '../views/shop/ShopView.vue';
import ShopHome from '../views/shop/ShopHome.vue';
import ShopBuy from '../views/shop/ShopBuy.vue';
import ShopPay from '../views/shop/ShopPay.vue';
import ShopOrders from '../views/shop/ShopOrders.vue';
import ShopLoginView from '../views/shop/ShopLoginView.vue';

export default [
    {
        path: '/shop',
        name: 'shop',
        component: ShopView,
        children: [
            {
                path: 'home',
                name: 'shophome',
                components: {
                    shopmain: ShopHome,
                },
                alias: '',
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
                },
            },
            {
                path: 'pay/:orderId?',
                name: 'shoppay',
                components: {
                    shopmain: ShopPay,
                },
                props: {
                    shopmain: true,
                },
            },
            {
                path: 'orders',
                name: 'shoporders',
                components: {
                    shopmain: ShopOrders,
                },
            },
        ],
    },
];
