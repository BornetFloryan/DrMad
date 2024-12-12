import BankView from '../views/bank/BankView.vue';
import BankHome from '../views/bank/BankHome.vue';
import BankAccount from '../views/bank/BankAccount.vue';
import BankAmount from '../views/bank/BankAmount.vue';
import BankOperation from '../views/bank/BankOperation.vue';
import BankHistory from '../views/bank/BankHistory.vue';
import BankLogout from '../views/bank/BankLogout.vue';

export default [
    {
        path: '/bank',
        name: 'bank',
        component: BankView,
        children: [
            {
                path: 'home',
                name: 'bankhome',
                components: {
                    bankmain: BankHome,
                },
                alias: '',
            },
            {
                path: 'account',
                name: 'bankaccount',
                components: {
                    bankmain: BankAccount,
                },
            },
            {
                path: 'amount',
                name: 'bankamount',
                components: {
                    bankmain: BankAmount,
                },
            },
            {
                path: 'operation',
                name: 'bankoperation',
                components: {
                    bankmain: BankOperation,
                },
            },
            {
                path: 'history',
                name: 'bankhistory',
                components: {
                    bankmain: BankHistory,
                },
            },
            {
                path: 'logout',
                name: 'banklogout',
                components: {
                    bankmain: BankLogout,
                },
            },
        ],
    },
];
