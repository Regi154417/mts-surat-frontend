import { defineStore } from 'pinia'
import { ref } from 'vue'
import { suratMasukService } from '@/services/suratMasukService.js'

export const useSuratMasukStore = defineStore('suratMasuk', () => {
  const list       = ref([])
  const detail     = ref(null)
  const loading    = ref(false)
  const pagination = ref({ total: 0, page: 1, limit: 10, totalPages: 0 })

  async function fetchAll(params = {}) {
    loading.value = true
    try {
      const res      = await suratMasukService.getAll(params)
      list.value     = res.data.data
      pagination.value = res.data.pagination
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id) {
    loading.value = true
    try {
      const res    = await suratMasukService.getById(id)
      detail.value = res.data.data
    } finally {
      loading.value = false
    }
  }

  async function create(formData) {
    const res = await suratMasukService.create(formData)
    return res.data
  }

  async function update(id, formData) {
    const res = await suratMasukService.update(id, formData)
    return res.data
  }

  async function remove(id) {
    const res = await suratMasukService.remove(id)
    return res.data
  }

  return { list, detail, loading, pagination, fetchAll, fetchById, create, update, remove }
})