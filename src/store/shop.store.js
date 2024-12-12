import ShopService from '../services/shop.service'
import { items, shopusers } from "@/datasource/data";

const state = () => ({
    viruses: [],
    shopUser: null,
    basket: {
        items: []
    },
});

const mutations = {
    updateViruses(state, viruses) {
        state.viruses = viruses;
    },
    updateShopUser(state, user) {
        if (user) {
            const foundUser = shopusers.find(u => u._id === user._id);
            state.shopUser = foundUser || user;
            state.basket = state.shopUser.basket || { items: [] };
        } else {
            state.shopUser = null;
            state.basket = { items: [] };
        }
    },
    addItemToBasket(state, data) {
        const foundUser = shopusers.find(u => u._id === state.shopUser._id);

        if (!state.basket || !foundUser.basket) {
            state.basket = { items: [] };
            foundUser.basket = state.basket;
        }
        if (!state.basket.items || !foundUser.basket.items) {
            state.basket.items = [];
            foundUser.basket.items = state.basket.items;
        }

        const existingItem = state.basket.items.find(basketItem => basketItem.item._id === data.item._id);
        const item = items.find(e => e._id === data.item._id);
        if (item) {
            item.stock -= data.quantity;
        }
        if (existingItem) {
            existingItem.amount += data.quantity;
        } else {
            state.basket.items.push({ item: data.item, amount: data.quantity });
        }
        if (state.shopUser) {
            if (foundUser) {
                foundUser.basket.items = state.basket.items;
            }
        }
    },
    removeItemFromBasket(state, data) {
        const item = items.find(e => e._id === data.item.item._id);
        if (item) {
            item.stock += data.item.amount;
        }

        state.basket.items = state.basket.items.filter(basketItem => basketItem.item._id !== data.item.item._id);
        if (state.shopUser) {
            const foundUser = shopusers.find(u => u._id === state.shopUser._id);
            if (foundUser) {
                foundUser.basket.items = state.basket.items;
            }
        }
    },
    clearBasket(state) {
        if (state.shopUser) {
            const foundUser = shopusers.find(u => u._id === state.shopUser._id);
            if (foundUser) {
                foundUser.basket.items.forEach(item => {
                    const foundItem = items.find(e => e._id === item.item._id);
                    if (foundItem) {
                        foundItem.stock += item.amount;
                    }
                });
                foundUser.basket.items = [];
            }
        }
        state.basket.items = [];
    },
    setOrders(state, orders) {
        const foundUser = shopusers.find(u => u._id === state.shopUser._id);
        if (foundUser) {
            foundUser.orders = orders;
        }
        state.shopUser.orders = orders;
    },
    updateOrderStatus(state, { orderId, status }) {
        const foundUser = shopusers.find(u => u._id === state.shopUser._id);
        if (foundUser) {
            const order = foundUser.orders.find(order => order.uuid === orderId);
            if (order) {
                order.status = status;
            }
        }
        const order = state.shopUser.orders.find(order => order.uuid === orderId);
        if (order) {
            order.status = status;
        }
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
            return response;
        }
    },
    async getBasket({commit}, data){
        let response = await ShopService.getBasket(data);
        if (response.error === 0) {
            commit('updateShopUser', response.data);
        } else {
            return response;
        }
    },
    async addItemToBasket({ commit }, data) {
        let response = await ShopService.updateBasket(data);
        if (response.error === 0) {
            commit('addItemToBasket', response.data);
        } else {
            return response;
        }
    },
    async removeItemFromBasket({ commit }, data) {
        let response = await ShopService.removeItemFromBasket(data);
        if (response.error === 0) {
            commit('removeItemFromBasket', response.data);
        } else {
            return response;
        }
    },
    async clearBasket({ commit }) {
        commit('clearBasket');
    },
    async fetchOrders({ commit }, userId) {
        let response = await ShopService.getOrders(userId);
        if (response.error === 0) {
            commit('setOrders', response.data);
        } else {
            return response;
        }
    },
    async cancelOrder({ commit }, {orderId, userId}) {
        let response = await ShopService.cancelOrder(orderId, userId);
        if (response.error === 0) {
            commit('updateOrderStatus', response.data);
        } else {
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