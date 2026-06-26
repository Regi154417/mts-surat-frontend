import api from './api.js'

export const suratKeluarService = {
  getAll(params = {}) {
    return api.get('/surat-keluar', { params })
  },

  getById(id) {
    return api.get(`/surat-keluar/${id}`)
  },

  create(formData) {
    return api.post('/surat-keluar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  update(id, formData) {
    return api.put(`/surat-keluar/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  remove(id) {
    return api.delete(`/surat-keluar/${id}`)
  }
}