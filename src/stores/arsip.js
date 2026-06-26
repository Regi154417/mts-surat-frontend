import { defineStore } from 'pinia'
import { ref } from 'vue'
import { arsipService } from '@/services/arsipService.js'

export const useArsipStore = defineStore('arsip', () => {
  const list    = ref([])
  const loading = ref(false)

  async function fetchAll(params = {}) {
    loading.value = true
    try {
      const res  = await arsipService.getAll(params)
      list.value = res.data.data
    } finally {
      loading.value = false
    }
  }

  return { list, loading, fetchAll }
})