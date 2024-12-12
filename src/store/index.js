import Vue from 'vue'
import Vuex from 'vuex'
import shop from './shop.store'
import bank from './bank.store'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        shop,
        bank
    }
})

