import api from './api.js'

export const authService = {
  /**
   * Login dengan username dan password
   */
  login(payload) {
    return api.post('/auth/login', payload)
  },

  /**
   * Ambil profil user yang sedang login
   */
  getProfile() {
    return api.get('/auth/profile')
  },

  /**
   * Ganti password
   */
  gantiPassword(payload) {
    return api.put('/auth/ganti-password', payload)
  }
}