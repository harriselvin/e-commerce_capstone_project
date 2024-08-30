import axios from 'axios'
import { createStore } from 'vuex'

const apiLink = 'https://e-commerce-capstone-project.onrender.com/'
/* eslint-disable */

export default createStore({
  state: {
    products: null,
    product: null,
    bestSellers: null,
    bestSeller: null
  },
  getters: {
  },
  mutations: {
    setProducts(state, payload) {
      state.products = payload
    },
    setProduct(state, payload) {
      state.product = {
        prodID: payload.prodID,
        prodName: payload.prodName,
        price: payload.price,
        quantity: payload.quantity,
        category: payload.category,
        prodUrl: payload.prodUrl,
        prodDesc: payload.prodDesc,
        prodInfo: payload.prodInfo
      }
    },
    setBestSellers(state, payload) {
      state.bestSellers = payload
    },
    setBestSeller(state, payload) {
      state.bestSeller = {
        bestSellerID: payload.bestSellerID,
        sellerName: payload.sellerName,
        sellerPrice: payload.sellerPrice,
        sellerUrl: payload.sellerUrl,
      }
    },
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
    },
    async getProduct({commit}, id) {
      try {
        const {data} = await axios.get(`${apiLink}item/${id}`)
        commit('setProduct', data)
        
      } catch (error) {
        console.error('Error fetching product:', error);
        commit('setError', error.message)
      }
    },
    async getBestSellers({commit}) {
      try {
        const {data} = await axios.get(`${apiLink}bestSellers`)
        commit('setBestSellers', data)
      } catch (error) {
        console.error('Error fetching best sellers:', error);
        commit('setError', error.message)
      }
    },
    async getBestSeller({commit}, id) {
      try {
        const {data} = await axios.get(`${apiLink}bestSeller/${id}`)
        commit('setBestSeller', data)
        
      } catch (error) {
        console.error('Error fetching best seller:', error);
        commit('setError', error.message)
      }
    },
  },
  modules: {
  }
})
