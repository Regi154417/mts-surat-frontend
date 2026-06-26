import { defineStore } from 'pinia'
import { ref } from 'vue'
import { suratKeluarService } from '@/services/suratKeluarService.js'

export const useSuratKeluarStore = defineStore('suratKeluar', () => {
  const list       = ref([])
  const detail     = ref(null)
  const loading    = ref(false)
  const pagination = ref({ total: 0, page: 1, limit: 10, totalPages: 0 })

  async function fetchAll(params = {}) {
    loading.value = true
    try {
      const res        = await suratKeluarService.getAll(params)
      list.value       = res.data.data
      pagination.value = res.data.pagination
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id) {
    loading.value = true
    try {
      const res    = await suratKeluarService.getById(id)
      detail.value = res.data.data
    } finally {
      loading.value = false
    }
  }

  async function create(formData) {
    const res = await suratKeluarService.create(formData)
    return res.data
  }

  async function update(id, formData) {
    const res = await suratKeluarService.update(id, formData)
    return res.data
  }

  async function remove(id) {
    const res = await suratKeluarService.remove(id)
    return res.data
  }

  return { list, detail, loading, pagination, fetchAll, fetchById, create, update, remove }
})