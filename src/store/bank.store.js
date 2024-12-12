import BankService from '../services/bankaccount.service'

const state = () => ({
    // state = les données centralisées
    account: '',
    accountAmount: 0,
    accountTransactions : [],
    accountNumberError : 0,
});
// mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
const mutations = {
    updateAccountAmount(state, mount) {
        state.accountAmount = mount
    },
    updateAccountTransactions(state, transactions) {
        state.accountTransactions = transactions;
    },
    updateAccountNumberError(state, error) {
        state.accountNumberError = error
    },
};
// actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
const actions = {
    async getAccountAmount({commit}, data) {
        let response = await BankService.getAccountAmount(data)
        if (response.error === 0) {
            commit('updateAccountAmount', response.data)
            commit('updateAccountNumberError', 1)
        }
        else {
            commit('updateAccountNumberError', -1)
            return response;
        }
    },
    async getAccountTransaction({commit}, data) {
        let response = await BankService.getAccountTransaction(data)
        if (response.error === 0) {
            commit('updateAccountTransactions', response.data)
            commit('updateAccountNumberError', 1)
        }
        else {
            commit('updateAccountNumberError', -1)
            return response;
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
