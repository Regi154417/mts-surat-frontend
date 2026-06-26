import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService.js'
import router from '@/router/index.js'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user  = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isLoggedIn = computed(() => !!token.value)
  const isAdmin    = computed(() => user.value?.role === 'admin')
  const isKepsek   = computed(() => user.value?.role === 'kepala_sekolah')
  const userName   = computed(() => user.value?.nama || '')
  const userRole   = computed(() => user.value?.role || '')

  async function login(credentials) {
    const res  = await authService.login(credentials)
    const data = res.data.data

    token.value = data.token
    user.value  = data.user

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    // Redirect berdasarkan role
    if (data.user.role === 'admin') {
      router.push({ name: 'admin.dashboard' })
    } else {
      router.push({ name: 'kepsek.dashboard' })
    }
  }

  function logout() {
    token.value = null
    user.value  = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push({ name: 'login' })
  }

  async function fetchProfile() {
    const res = await authService.getProfile()
    user.value = res.data.data
    localStorage.setItem('user', JSON.stringify(res.data.data))
  }

  return {
    token, user,
    isLoggedIn, isAdmin, isKepsek, userName, userRole,
    login, logout, fetchProfile
  }
})