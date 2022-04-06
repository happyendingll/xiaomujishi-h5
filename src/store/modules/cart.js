import shop from '../../api/shop'

// initial state
// shape: [{ _id, quantity }]
const state = {
    items: [],
    checkoutStatus: null
}

// getters
const getters = {
    cartProducts: (state, getters, rootState) => {
        return state.items.map(({ _id, quantity }) => {
            const product = rootState.products.all.find(product => product._id === _id)
            return {
                _id: product._id,
                name: product.name,
                price: product.price,
                originalPrice:product.originalPrice,
                imgUrl:product.imgUrl,
                quantity
            }
        })
    },

    cartTotalPrice: (state, getters) => {
        return getters.cartProducts.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    }
}

// actions
const actions = {
    checkout ({ commit, state }, products) {
        const savedCartItems = [...state.items]
        commit('setCheckoutStatus', null)
        // empty cart
        commit('setCartItems', { items: [] })
        shop.buyProducts(
            products,
            () => commit('setCheckoutStatus', 'successful'),
            () => {
                commit('setCheckoutStatus', 'failed')
                // rollback to the cart saved before sending the request
                commit('setCartItems', { items: savedCartItems })
            }
        )
    },

    addProductToCart ({ state, commit }, product) {
        commit('setCheckoutStatus', null)
            const cartItem = state.items.find(item => item._id === product._id)
            if (!cartItem) {
                commit('pushProductToCart', { _id: product._id })
            } else {
                commit('incrementItemQuantity', cartItem)
            }
    }
}

// mutations
const mutations = {
    pushProductToCart (state, { _id }) {
        state.items.push({
            _id,
            quantity: 1
        })
    },

    incrementItemQuantity (state, { _id }) {
        const cartItem = state.items.find(item => item._id === _id)
        cartItem.quantity++
    },

    setCartItems (state, { items }) {
        state.items = items
    },

    setCheckoutStatus (state, status) {
        state.checkoutStatus = status
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
