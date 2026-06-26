import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.js'

export function useAuth() {
  const store = useAuthStore()

  return {
    user:       computed(() => store.user),
    isLoggedIn: computed(() => store.isLoggedIn),
    isAdmin:    computed(() => store.isAdmin),
    isKepsek:   computed(() => store.isKepsek),
    userName:   computed(() => store.userName),
    userRole:   computed(() => store.userRole),
    login:      store.login,
    logout:     store.logout
  }
}