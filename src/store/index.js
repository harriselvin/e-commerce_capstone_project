/* eslint-disable */
import axios from 'axios'
import { createStore } from 'vuex'
import router from '@/router'

axios.defaults.withCredentials = true

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const apiLink = 'https://e-commerce-capstone-project.onrender.com/'

axios.defaults.headers = { 'Authorization': `Bearer ${getCookie('token')}` }

export default createStore({
  state: {
    products: [],
    product: null,
    bestSellers: [],
    bestSeller: null,
    faq: null,
    error: null
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
        sellerQuantity: payload.sellerQuantity,
        sellerCategory: payload.sellerCategory,
        sellerDesc: payload.sellerDesc,
        sellerInfo: payload.sellerInfo
      }
    },
    setFaq(state, payload) {
      state.faq = payload
    },
    setError(state, payload) {
      state.error = payload
    }
  },
  actions: {
    async getProducts({commit}) {
      try {
        const {data} = await axios.get(`${apiLink}items`)
        console.log('Received products data:',data);
        
        commit('setProducts', data)
      } catch (error) {
        if (error.response.status === 401 && error.response.data.message === 'Token has expired') {
          // Handle token expiration
          Alert('Token has expired. Please login again.');
          // Redirect to login page
          await router.push('/login');
        } else {
          console.error('Error fetching products:', error);
          commit('setError', error.message);
        }
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
    async getFaq({commit}) {
      try {
        const {data} = await axios.get(`${apiLink}faq`)
        commit('setFaq', data)
      } catch (error) {
        console.error('Error fetching faq:', error);
        commit('setError', error.message)
      }
    },
    async addUser({commit}, info) {
      const data = await axios.post(`${apiLink}register`, info)
      console.log('User data:', data);
      
      document.cookie = `token=${data.token};path=/;max-age=3600`;

      console.log(data.token);
      // await router.push('/admin')
    },
    async loginUser({commit}, info) {
      console.log(info);
      
      let {data} = await axios.post(`${apiLink}login`, info)
      console.log(data);

      this.post = data
      
      document.cookie = `token=${data.token};path=/;max-age=3600`;

      await router.push('/')
      location.reload()
    },
  },
  modules: {
  }
})
