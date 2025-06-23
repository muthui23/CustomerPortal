import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
//import { useApi } from '@/composables/useApi'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const { api } = useApi()
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  async function sendOtp(email) {
    const response = await api.post('/auth/send-otp', { email })
    return response.data
  }

  async function verifyOtp(email, otp) {
    const response = await api.post('/auth/verify-otp', { email, otp })
    token.value = response.data.token
    localStorage.setItem('token', token.value)
    await fetchUser()
    return response.data
  }

  async function fetchUser() {
    const response = await api.get('/auth/me')
    user.value = response.data
    return user.value
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    router.push('/login')
  }

  return {
    user,
    token,
    sendOtp,
    verifyOtp,
    fetchUser,
    logout
  }
})