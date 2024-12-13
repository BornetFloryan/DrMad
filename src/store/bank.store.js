import BankService from '../services/bank.service';

const state = () => ({
    bankAccount: '',
    accountAmount: 0,
    accountTransactions: [],
});

const mutations = {
    updateAccount(state, account) {
        state.bankAccount = account;
    },
    updateAccountAmount(state, amount) {
        state.accountAmount = amount;
    },
    updateAccountTransactions(state, transactions) {
        if (state.accountTransactions.length === 0) {
            state.accountTransactions = transactions;
        }
    },
    addTransaction(state, transaction) {
        state.accountTransactions.push(transaction);
    },
};

const actions = {
    async getAccount({ commit }, data) {
        let response = await BankService.getAccount(data);
        if (response.error === 0) {
            commit('updateAccount', response.data);
        } else {
            return response;
        }
    },
    async getAccountAmount({ commit }, data) {
        let response = await BankService.getAccountAmount(data);
        if (response.error === 0) {
            commit('updateAccountAmount', response.data);
        } else {
            return response;
        }
    },
    async getAccountTransactions({ commit }) {
        let response = await BankService.getAccountTransactions();
        if (response.error === 0) {
            commit('updateAccountTransactions', response.data);
        } else {
            return response;
        }
    },
    async createWithdrawal({ commit, state }, { number, amount }) {
        const response = await BankService.createWithdrawal({ number, amount });
        if (response.error === 0) {
            commit('updateAccountAmount', state.accountAmount - response.data.amount);
            commit('addTransaction', response.data.transaction);

            return { error: 0, status: 200, data: response.data };
        } else {
            return response;
        }
    },
    async createPayment({ commit, state }, { number, amount, recipient }) {
        const response = await BankService.createPayment({ number, amount, recipient });
        if (response.error === 0) {
            commit('updateAccountAmount', state.accountAmount - response.data.amount);
            commit('addTransaction', response.data.transaction);

            return { error: 0, status: 200, data: response.data };
        } else {
            return response;
        }
    },
    async bankLogout({ commit }) {
        commit('updateAccount', '');
        commit('updateAccountAmount', 0);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};