import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from '../views/ShopView.vue'
import ProductView from '../views/ProductView.vue'
import BestSellerView from '@/views/BestSellerView.vue'
import FaqView from '@/views/FaqView.vue'
import TermsAndConditionsView from '@/views/TermsAndConditionsView.vue'
import PrivacyPolicyView from '@/views/PrivacyPolicyView.vue'
import ShippingPolicyView from '@/views/ShippingPolicyView.vue'
import RefundPolicyView from '@/views/RefundPolicyView.vue'
import CookiePolicyView from '@/views/CookiePolicyView.vue'

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
  {
    path: '/faq',
    name: 'faq',
    component: FaqView
  },
  {
    path: '/termsAndConditions',
    name: 'termsAndConditions',
    component: TermsAndConditionsView
  },
  {
    path: '/privacyPolicy',
    name: 'privacyPolicy',
    component: PrivacyPolicyView
  },
  {
    path: '/shippingPolicy',
    name: 'shippingPolicy',
    component: ShippingPolicyView
  },
  {
    path: '/refundPolicy',
    name: 'refundPolicy',
    component: RefundPolicyView
  },
  {
    path: '/cookiePolicy',
    name: 'cookiePolicy',
    component: CookiePolicyView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
