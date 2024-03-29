/* eslint-disable no-unused-vars */
const axios = require('axios');
import * as types from './mutation-types'

const state = {
    cartItems: [],
    checkout: false
}

const mutations = {
    [ types.UPDATE_CART_ITEMS ](state, payload) {
        state.cartItems = payload;
    },
    CHECKOUT_CART(state) {
        state.checkout = true
    }
}

const actions = {
    getCartItems({ commit }) {
        axios.get('/api/cart')
            .then( response => { commit(types.UPDATE_CART_ITEMS, (response.data))})
    },
    addCartItem({ commit }, cartItem){
        axios.post('/api/cart', cartItem)
            .then(response => { commit(types.UPDATE_CART_ITEMS, (response.data))})
    },
    removeCartItem({ commit }, cartItem) {
        axios.post('/api/cart/delete', cartItem)
            .then( response => { commit(types.UPDATE_CART_ITEMS, (response.data))})
    },
    removeAllCartItem({ commit }) {
        axios.post('/api/cart/delete/all')
            .then( response => { commit(types.UPDATE_CART_ITEMS, (response.data))})
    },
    checkoutCart({ commit }, cart) {
        axios.post('/api/cart/checkout')
            .then( response => {
                commit('CHECKOUT_CART')
            })
    }
}

const getters = {
    // the first argument is the state
    cartItems: state => state.cartItems,
    cartTotal: state => {
        return state.cartItems
            .reduce((acc, cartItem) => {
                return cartItem.quantity * cartItem.price + acc
            }, 0)
            .toFixed(2)
    },
    cartQuantity: state => {
        return state.cartItems.reduce((acc, cartItem) => {
            return cartItem.quantity + acc;
        }, 0)
    }
}

const cartModule = {
    state,
    mutations,
    actions,
    getters
}
// page 196

export default cartModule;