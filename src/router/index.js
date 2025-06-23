import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import Dashboard from '@/views/Dashboard.vue'
// import LoginView from '@/views/Login.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: LoginView,
  // },

  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: { title: 'Dashboard' },
  },
  {
    path: '/statements',
    name: 'statements',
    component: () => import('@/views/Statementsview.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/bills',
    name: 'bills',
    component: () => import('@/views/BillsView.vue'),
    meta: { requiresAuth: true },
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true'
//   if (to.meta.requiresAuth && !isLoggedIn) {
//     next('/login')
//   } else {
//     next()
//   }
//})

export default router
