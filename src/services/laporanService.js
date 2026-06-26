import api from './api.js'

export const laporanService = {
  /**
   * Generate laporan berdasarkan periode
   */
  getLaporan(params = {}) {
    return api.get('/laporan', { params })
  }
}