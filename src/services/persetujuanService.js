import api from './api.js'

export const persetujuanService = {
  getAll(params = {}) {
    return api.get('/persetujuan', { params })
  },

  getById(id) {
    return api.get(`/persetujuan/${id}`)
  },

  /**
   * Setujui / tolak surat keluar (kepala sekolah)
   */
  create(payload) {
    return api.post('/persetujuan', payload)
  }
}