import { createStore } from 'vuex'
import product from './modules/product'
import cart from './modules/cart'

// Create a new store instance.
// const store = createStore({})
export default createStore({
    modules: {
        product,
        cart
    }
})