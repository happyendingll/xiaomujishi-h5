// import shop from '../../api/shop'
// import Shop from '@/views/shop/Shop'

// initial state
const state = {
    all: []
}

// getters
const getters = {}

// actions
const actions = {
    getAllProducts ({ commit },products) {
            commit('setProducts', products)
    }
}

// mutations
const mutations = {
    setProducts (state, products) {
        state.all = products
        console.log(state.all)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
