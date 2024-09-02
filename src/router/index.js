import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'
import ProductView from '../views/ProductView.vue'
import BestSellerView from '@/views/BestSellerView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/shop/:category?',
    name: 'shop',
    component: ShopView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/product/:id',
    name: 'product',
    component: ProductView
  },
  {
    path: '/bestSeller/:id',
    name: 'bestSeller',
    component: BestSellerView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
