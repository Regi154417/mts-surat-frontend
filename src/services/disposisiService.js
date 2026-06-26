import api from './api.js'

export const disposisiService = {
  getAll(params = {}) {
    return api.get('/disposisi', { params })
  },

  getById(id) {
    return api.get(`/disposisi/${id}`)
  },

  /**
   * Kirim disposisi baru (admin)
   */
  create(payload) {
    return api.post('/disposisi', payload)
  },

  /**
   * Isi arahan & ubah status disposisi (kepala sekolah)
   */
  update(id, payload) {
    return api.put(`/disposisi/${id}`, payload)
  }
}