const axios = require('axios');

const state = {
    productItems: []
}

const mutations = {
    // the first parameter is the state object
    UPDATE_PRODUCT_ITEMS(state, payload) {
        state.productItems = payload;
    }
}

const actions = {
    // the first parameter is the context object
    // then we destructuring the context object to get the commit function
    getProductItems( { commit } ) {
        axios.get('/api/products')
            .then( (response) => { commit('UPDATE_PRODUCT_ITEMS', response.data) })
    }
}

const getters = {
    // the first parameter is the state object
    productItems: state => state.productItems
}

const productModule = {
    state,
    mutations,
    actions,
    getters
}

export default productModule;

// Path: src\app\store\modules\cart\index.js
// Notes:
/* 
    Destructuring the state object:
    var obj = {a: "A", func: function() {}}

    to get access to func path
    function(obj){ var func = obj.func }

    in ES6 we can do this:
    function({func}) {}
*/