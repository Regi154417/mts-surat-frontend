import api from './api.js'

export const suratMasukService = {
  /**
   * Ambil semua surat masuk dengan filter & paginasi
   */
  getAll(params = {}) {
    return api.get('/surat-masuk', { params })
  },

  /**
   * Ambil detail surat masuk berdasarkan ID
   */
  getById(id) {
    return api.get(`/surat-masuk/${id}`)
  },

  /**
   * Tambah surat masuk baru (dengan file upload)
   */
  create(formData) {
    return api.post('/surat-masuk', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  /**
   * Update surat masuk (dengan file upload opsional)
   */
  update(id, formData) {
    return api.put(`/surat-masuk/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  /**
   * Hapus surat masuk
   */
  remove(id) {
    return api.delete(`/surat-masuk/${id}`)
  }
}