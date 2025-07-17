import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'

import LoginView from '@/Login.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [

   {
   path: '/',
    name: 'login',
     component: LoginView,
     meta: {guestOnly:true}
     
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
     meta: { requiresAuth: true }
   
  },
  {
    path: '/statements',
    name: 'statements',
    component: () => import('@/views/Statementsview.vue'),
    meta: { requiresAuth: true },
  },
   {
    path: '/meter',
    name: 'meter details',
    component: () => import('@/views/Meter.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/bills',
    name: 'bills',
    component: () => import('@/views/BillsView.vue'),
    meta: { requiresAuth: true },
  },
   {
    path: '/payments',
    name: 'payments',
    component: () => import('@/views/PaymentsView.vue'),
    meta: { requiresAuth: true },
  },

  {
  path: '/make-payment',
  name: 'make-payment',
  component: () => import('@/views/MakePayment.vue')
}

]
const router =  createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('otp_verified') === 'true'
 if (to.meta.requiresAuth && !isAuthenticated) {
    // Trying to access a protected route while not logged in
    next({ name: 'login' })
  } else if (to.name === 'login' && isAuthenticated) {
    // Already logged in, redirect away from login
    next({ name: 'dashboard' })
  } else {
    next()
  }
  })

export default router
