import ShopService from '../services/shop.service'
import {items} from "@/datasource/data";

const state = () => ({
    viruses: [],
    shopUser: null,
    basket: [],
});

const mutations = {
    updateViruses(state, viruses) {
        state.viruses = viruses;
    },
    updateShopUser(state, user) {
        state.shopUser = user;
    },
    updateBasket(state, basket) {
        state.basket = basket;
    },
    addItemToBasket(state, data) {
        const existingItem = state.basket.find(basketItem => basketItem.item._id === data.item._id);
        items.find(e => e._id === data.item._id).stock -= data.quantity;
        if (existingItem) {
            existingItem.amount += data.quantity;
        } else {
            state.basket.push({ item: data.item, amount: data.quantity });
        }
    },
    removeItemFromBasket(state, data) {
        state.basket = state.basket.filter(basketItem => basketItem._id !== data.item._id);
    },
    clearBasket(state) {
        state.basket = [];
    }
};

const actions = {
    async shopLogin({ commit }, data) {
        let response = await ShopService.shopLogin(data);
        if (response.error === 0) {
            commit('updateShopUser', response.data);
        } else {
            return response;
        }
    },
    async shopLogout({ commit }) {
        commit('updateShopUser', null);
    },
    async getAllViruses({ commit }) {
        let response = await ShopService.getAllViruses();
        if (response.error === 0) {
            commit('updateViruses', response.data);
        } else {
            console.log(response.data);
        }
    },
    async getBasket({ commit }) {
        let response = await ShopService.getBasket(state.shopUser.login);
        if (response.error === 0) {
            commit('updateBasket', response.data);
        } else {
            return response;
        }
    },
    async addItemToBasket({ commit }, data) {
        let response = await ShopService.updateBasket(data);
        console.log(response);
        if (response.error === 0) {
            commit('addItemToBasket', response.data);
        } else {
            return response;
        }
    },
    async removeItemFromBasket({ commit }, data) {
        let response = await ShopService.updateBasket(data);
        if (response.error === 0) {
            commit('removeItemFromBasket', response.data);
        } else {
            return response;
        }
    },
    async clearBasket({ commit }, data) {
        let response = await ShopService.updateBasket(data);
        if (response.error === 0) {
            commit('clearBasket');
        } else {
            return response;
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};