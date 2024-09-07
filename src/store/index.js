/* eslint-disable */
import axios from 'axios'
import { createStore } from 'vuex'
import router from '@/router'
import VueCookies from 'vue-cookies'

axios.defaults.withCredentials = true

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

const apiLink = 'https://e-commerce-capstone-project.onrender.com/'

axios.defaults.headers.Authorization = `Bearer ${getCookie('token')}` 

export default createStore({
  state: {
    products: [],
    product: null,
    bestSellers: [],
    bestSeller: null,
    faq: null,
    error: null,
    cart: [],
    cartItems: [],
    userId: null,
    isAuthenticated: false
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
    },
    setAddToCart(state, item) {
      const cartItem = state.cart.find(item => item.product.id === product.id);
      if (cartItem) {
        cartItem.quantity += quantity
      } else {
        state.cart.push(item)
      }
    },
    setCartItems(state, payload) {
      state.cartItems = payload
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    setAuthentication(state, status) {
      state.isAuthenticated = status
    }
  },
  actions: {
    async getProducts({ commit }) {
      try {
        const {data} = await axios.get(`${apiLink}items`)
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
    async getProduct({ commit }, id) {
      try {
        const {data} = await axios.get(`${apiLink}item/${id}`)
        commit('setProduct', data)
      } catch (error) {
        console.error('Error fetching product:', error);
        commit('setError', error.message)
      }
    },
    async getBestSellers({ commit }) {
      try {
        const {data} = await axios.get(`${apiLink}bestSellers`)
        commit('setBestSellers', data)
      } catch (error) {
        console.error('Error fetching best sellers:', error);
        commit('setError', error.message)
      }
    },
    async getBestSeller({ commit }, id) {
      try {
        const {data} = await axios.get(`${apiLink}bestSeller/${id}`)
        commit('setBestSeller', data)
        
      } catch (error) {
        console.error('Error fetching best seller:', error);
        commit('setError', error.message)
      }
    },
    async getFaq({ commit }) {
      try {
        const {data} = await axios.get(`${apiLink}faq`)
        commit('setFaq', data)
      } catch (error) {
        console.error('Error fetching faq:', error);
        commit('setError', error.message)
      }
    },
    async addUser({ commit }, user) {
      try {
        const response = await axios.post(`${apiLink}register`, user)
        const token = response.data.token

        VueCookies.set('token', token, 'id')
        commit('setAuthentication', true);
      } catch (error) {
        console.error('Signup error:', error.response || error);
        commit('setAuthentication', false);
        throw error;
      }
    },
    async loginUser({ commit }, { email, password }) {
      try {
        let response = await axios.post(`${apiLink}login`, { email, password })
        console.log(response);

        const token = response.data.token

        VueCookies.set('token', token, 'id')
        commit('SET_USER', response.data.user);

      } catch (error) {
        console.error('Login error:', error.response || error);
        commit('setAuthentication', false);
        throw error;
      }      
      
    },
    async addToCart({ commit }, item) {
      try {
        // retrieve user ID from cookie or store/VueX state
        const userId = getCookie('userId') || state.userId 
        const token = getCookie('token')
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`
            }
        })
        // axios.defaults.headers.Authorization = `Bearer ${getCookie('token')}`
        const {data} = await axiosInstance.post(`${apiLink}user/${userId}/cart`, {
          product: product.id,
          quantity
        })
        commit('setAddToCart', item)
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    },
    async addToCartDatabase({ state }) {
      const cartItems = state.cart

      try {
        const userId = getCookie('userId') ||  state.userId
        const token = getCookie('token')
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        await Promise.all(
          cartItems.map(async (item) => {
            await axiosInstance.post(`${apiLink}user/${userId}/cart`, {
              product: item.product.id,
              quantity: item.quantity
            })
          })
        )

        alert('Items successfully added to the cart!')
      } catch (error) {
        console.error('Error adding items to the cart database:', error);
        
      }
    },
    async getCartItems({ commit , state}) {
      try {
        // retrieve user ID from cookie or store/VueX state
        const userId = getCookie('userId') || state.userId 
        const token = getCookie('token')
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`
            }
        })
        const {data} = await axiosInstance.get(`${apiLink}user/${userId}/carts`)
        commit('setCartItems', data)
      } catch (error) {
        console.error( 'Error fetching cart items:', error);
      }
    },
    async login({commit}, { email, password }) {
      try {
        // Make the login request to the backend
        const response = await axios.post(`${apiLink}login`, { email, password });
        
        // If login is successful, get the token
        const token = response.data.token;

        // Set the token in cookies
        VueCookies.set('token', token, '1d'); // Store token for 1 day
        commit('setAuthentication', true); // Update the authentication status

      } catch (error) {
        console.error('Login error:', error.response || error);
        commit('setAuthentication', false);
        throw error; // Propagate error for handling in component
      }
    },
    logout({commit}) {
      VueCookies.remove('token')
      commit('setAuthentication', false)
    },
    checkAuth({commit}) {
      const token = VueCookies.get('token')
      commit('setAuthentication', !!token)
    }
  },
  modules: {
  }
})
