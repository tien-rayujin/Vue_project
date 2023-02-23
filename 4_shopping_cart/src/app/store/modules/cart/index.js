const axios = require('axios');

const state = {
    cartItems: []
}

const mutations = {
    UPDATE_CART_ITEMS(state, payload) {
        state.cartItems = payload;
    }
}

const actions = {
    getCartItems({ commit }) {
        axios.get('/api/cart')
            .then( response => { commit('UPDATE_CART_ITEMS', (response.data))})
    }
}

const getters = {}

const cartModule = {
    state,
    mutations,
    actions,
    getters
}
// page 196

export default cartModule;