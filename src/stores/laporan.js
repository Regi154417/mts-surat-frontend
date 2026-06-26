import { defineStore } from 'pinia'
import { ref } from 'vue'
import { laporanService } from '@/services/laporanService.js'

export const useLaporanStore = defineStore('laporan', () => {
  const data      = ref([])
  const ringkasan = ref({ total: 0, surat_masuk: 0, surat_keluar: 0 })
  const periode   = ref({ tanggal_mulai: '', tanggal_akhir: '' })
  const loading   = ref(false)

  async function fetchLaporan(params = {}) {
    loading.value = true
    try {
      const res      = await laporanService.getLaporan(params)
      data.value     = res.data.data
      ringkasan.value = res.data.ringkasan
      periode.value  = res.data.periode
    } finally {
      loading.value = false
    }
  }

  function reset() {
    data.value      = []
    ringkasan.value = { total: 0, surat_masuk: 0, surat_keluar: 0 }
    periode.value   = { tanggal_mulai: '', tanggal_akhir: '' }
  }

  return { data, ringkasan, periode, loading, fetchLaporan, reset }
})