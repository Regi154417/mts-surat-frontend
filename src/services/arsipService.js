import api from './api.js'

export const arsipService = {
  getAll(params = {}) {
    return api.get('/arsip', { params })
  }
}