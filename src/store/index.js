import axios from 'axios'
import { createStore } from 'vuex'

const apiLink = 'https://e-commerce-capstone-project.onrender.com/'
/* eslint-disable */

export default createStore({
  state: {
    products: null
  },
  getters: {
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    }
  },
  actions: {
    async getProducts({commit}) {
      try {
        const {data} = await axios.get(`${apiLink}items`)
        commit('setProducts', data)
      } catch (error) {
        console.error('Error fetching products:', error);
        commit('setError', error.message)
      }
    }
  },
  modules: {
  }
})
