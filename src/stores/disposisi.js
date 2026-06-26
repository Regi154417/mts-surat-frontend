import { defineStore } from 'pinia'
import { ref } from 'vue'
import { disposisiService } from '@/services/disposisiService.js'

export const useDisposisiStore = defineStore('disposisi', () => {
  const list    = ref([])
  const detail  = ref(null)
  const loading = ref(false)

  async function fetchAll(params = {}) {
    loading.value = true
    try {
      const res  = await disposisiService.getAll(params)
      list.value = res.data.data
    } finally {
      loading.value = false
    }
  }

  async function fetchById(id) {
    loading.value = true
    try {
      const res    = await disposisiService.getById(id)
      detail.value = res.data.data
    } finally {
      loading.value = false
    }
  }

  async function create(payload) {
    const res = await disposisiService.create(payload)
    return res.data
  }

  async function update(id, payload) {
    const res = await disposisiService.update(id, payload)
    return res.data
  }

  return { list, detail, loading, fetchAll, fetchById, create, update }
})