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
    },
    productsQuantity:(state)=>{
        const productsQuantity=[]
        state.items.map(value => {
            productsQuantity[value._id]=value.quantity
        })
        return productsQuantity
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
    },
    removeProductFromCart ({ state, commit},product){
        const cartItem = state.items.find(item => item._id === product._id)
        //数量大于1,数量减少1
        if (cartItem.quantity>1){
            commit('decreaseItemQuantity')
        } else if (cartItem.quantity===1){
            commit('dropProductFromCart',cartItem)
        }
    },
    clearProductsFromCart({ commit}){
        commit('clearItemsFromCart')
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
    dropProductFromCart (state, { _id }) {
        state.items.map((value,index)=>{
            if (value._id===_id){
                state.items.splice(index,1)
            }
        })
    },
    clearItemsFromCart (state){
        // state.items.splice(0,state.items.length)
        state.items=[]
    },

    incrementItemQuantity (state, { _id }) {
        const cartItem = state.items.find(item => item._id === _id)
        cartItem.quantity++
    },
    decreaseItemQuantity(state, { _id }) {
        const cartItem = state.items.find(item => item._id === _id)
        cartItem.quantity--
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
