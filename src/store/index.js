/* eslint-disable */
import axios from 'axios'
import { createStore } from 'vuex'
import router from '@/router'
import VueCookies from 'vue-cookies'

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
}

const apiLink = 'https://e-commerce-capstone-project.onrender.com/'

const axiosInstance = axios.create({
  baseURL: apiLink,
  headers: {
    Authorization: `Bearer ${getCookie('token')}`
  },
  withCredentials: true,
});

export default createStore({
  state: {
    users: [],
    user: null,
    adminUsers: [],
    addAdminUser: null,
    addUser: null,
    addProduct: null,
    editAdminUser: null,
    editUser: null,
    editProduct: null,
    removeUser: null,
    removeProduct: null,
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
    setUsers(state, payload) {
      state.users = payload
    },
    setUser(state, payload) {
      state.user = {
        ...payload,
        profileUrl: payload.profileFile.replace(/^"|"$/g, '')
      }
    },
    setAdminUsers(state, payload) {
      state.adminUsers = payload
    },
    setAddUser(state, payload) {
      state.addUser = payload
    },
    setAddProduct(state, payload) {
      state.addProduct = payload
    },
    setAddAdminUser(state, payload) {
      state.addAdminUser = payload
    },
    setEditAdminUser(state, payload) {
      state.editAdminUser = payload
    },
    setEditUser(state, payload) {
      state.editUser = payload
    },
    setEditProduct(state, payload) {
      state.editProduct = payload
    },
    removeUser(state, userId) {
      state.users = state.users.filter(user => user.id !== userId)
    },
    removeProduct(state, productId) {
      state.products = state.products.filter(product => product.id !== productId)
    },
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
    setAddToCart(state, product) {
      const index = state.cart.findIndex(item => item.product.id === product.id);
      if (index !== -1) {
        // cartItem.quantity += quantity
        state.cart[index].quantity += product.quantity
      } else {
        state.cart.push({ product, quantity: product.quantity })
      }
    },
    setCartItems(state, payload) {
      state.cartItems = payload.map(item => ({
        id: item.id,
        product: item.product,
        quantity: item.quantity
      }))
    },
    setUserId(state, userId) {
      state.userId = userId
    },
    setAuthentication(state, status) {
      state.isAuthenticated = status
    },
    UPDATE_CART_ITEMS(state, cartItems) {
      state.cart = cartItems
    },
    updateQuantity(state, { productId, quantity }) {
      const index = state.cart.findIndex(item => item.product.id === productId)
      if (index !== -1) {
        state.cart[index].quantity = quantity
      }
    }
  },
  actions: {
    async getUsers({ commit }) {
      try {
        const {data} = await axios.get(`${apiLink}users`)
        commit('setUsers', data)
      } catch (error) {
        console.error('Error fetching users', error)
      }
    },
    async getUser({ commit }, id) {
      try {
        const {data} = await axios.get(`${apiLink}user/${id}`)
        commit('setUser', data)
      } catch (error) {
        console.error('Error fetching user', error)
        commit('setError', error.message)
      }
    },
    async getAdminUsers({ commit }) {
      try {
        const {data} = await axios.get(`${apiLink}admins`)
        commit('setAdminUsers', data)
      } catch (error) {
        console.error('Error fetching admin users', error)
      }
    },
    async addAdminUser({ commit }, userData) {
      try {
        const response = await axios.post(`${apiLink}registerAdmin`, userData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        commit('SET_USER', response.data);
        commit('setAddAdminUser', data)
      } catch (error) {
        console.error('Error adding user:', {
          message: error.message,
          response: error.response ? error.response.data : 'No response data',
          status: error.response ? error.response.status : 'No response status',
        });
      }
    },
    async editUser({ commit }, id) {
      try {
        const {data} = await axios.put(`${apiLink}user/${id}`)
        commit('setEditUser', data)
      } catch (error) {
        console.error('Error editing user', error)
        commit('setError', error.message)
      }
    },
    async editProduct({ commit }, id) {
      try {
        const {data} = await axios.put(`${apiLink}item/${id}`)
        commit('setEditProduct', data)
      } catch (error) {
        console.error('Error editing product', error)
        commit('setError', error.message)
      }
    },
    async editAdminUser({ commit }, id) {
      try {
        const {data} = await axios.put(`${apiLink}admin/${id}`)
        commit('setEditAdminUser', data)
      } catch (error) {
        console.error('Error editing admin user', error)
        commit('setError', error.message)
      }
    },
    async removeUser({ commit }, id) {
      try {
        const { data } = await axios.delete(`${apiLink}user/${id}`)
        commit('removeUser', data)
        alert('User successfully deleted!')
      } catch (error) {
        console.error('Error removing user', error)
        commit('setError', error.message)
      }
    },
    async removeProduct({ commit }, id) {
      try {
        const { data } = await axios.delete(`${apiLink}item/${id}`)
        commit('removeProduct', data)
        alert('Product successfully deleted!')
      } catch (error) {
        console.error('Error removing product', error)
        commit('setError', error.message)
      }
    },
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
    async addProduct({ commit }, product) {
      try {
        const response = await axios.post(`${apiLink}items`, product)
        const token = response.data.token

        // VueCookies.set('token', token, 'id')
        // commit('setAuthentication', true);
        commit('setAddProduct', response.data)
      } catch (error) {
        console.error('Signup error:', error.response || error);
        commit('setAuthentication', false);
        throw error;
      }
    },
    async loginUser({ commit }, { email, password }) {
      try {
        let response = await axios.post(`${apiLink}loginAdmin`, { email, password })
        console.log(response);

        const token = response.data.token

        VueCookies.set('token', token, 'id')
        commit('SET_USER', response.data.user);

      } catch (error) {
        console.error('Login error:', {
          message: error.message,
          data: error.response ? error.response.data : 'No response data',
          status: error.response ? error.response.status : 'No response status',
          headers: error.response ? error.response.headers : 'No response headers'
        });
        commit('setAuthentication', false);
        throw error;
      }      
      
    },
    async addToCart({ commit, state }, product) {
      try {
        const cartItems = state.cart
        const existingProductIndex = cartItems.findIndex(item => item.product.id === product.id)

        if (existingProductIndex !== -1) {
          cartItems[existingProductIndex].quantity += product.quantity
        } else {
          cartItems.push({ product, quantity: product.quantity })
        }

        commit('setAddToCart', cartItems)

        localStorage.setItem('cartItems', JSON.stringify(cartItems))
      } catch (error) {
        console.error('Error adding item to cart:', error);
      }
    },
    async addToCartDatabase({ commit }, state) {
      // const cartItems = state.cart

      try {
        const userId = state.userId || getCookie('userId')
        const token = getCookie('token')
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const promises = state.cart.map(item => {
          axiosInstance.post(`${apiLink}user/${userId}/cart`, {
            product: item.product.id,
            quantity: item.quantity
          })
        }) 

        await Promise.all(promises)

        commit('UPDATE_CART_ITEMS', state.cart)
        // commit('setCartItems', cartItems)
        localStorage.setItem('cartItems', JSON.stringify(state.cart))
        alert('Item successfully added to the cart!')
      } catch (error) {
        console.error('Error adding items to the cart database:', error);
        
      }
    },
    async deleteUser({ commit }, userId) {
      try {
        await axios.delete(`${apiLink}user/${userId}`)
        commit('removeUser', userId)
      } catch (error) {
        console.error('Error deleting user:', error);
        commit('setError', error.message);
      }
    },
    async deleteProduct({ commit }, productId) {
      try {
        await axios.delete(`${apiLink}item/${productId}`)
        commit('removeProduct', productId)
      } catch (error) {
        console.error('Error deleting product:', error);
        commit('setError', error.message);
      }
    },
    async getCartItems({ commit , state}) {
      const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || []
      if (savedCartItems.length > 0) {
        commit('UPDATE_CART_ITEMS', savedCartItems)
      }

      try {
        // retrieve user ID from cookie or store/VueX state
        const userId = state.userId || getCookie('userId')
        console.log('userId:', userId);
        
        const token = getCookie('token')
        console.log('token:', token);
        
        const axiosInstance = axios.create({
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        })
        
        const {data} = await axiosInstance.get(`${apiLink}user/${userId}/carts`)
        commit('setCartItems', data)
        console.log('Cart items retrieved:', data);
        
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
        const userId = response.data.userId

        VueCookies.set('token', token, '1d'); 
        commit('setAuthentication', true); 
        commit('setUserId', userId)
        
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
