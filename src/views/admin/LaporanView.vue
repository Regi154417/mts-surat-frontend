<template>
  <div class="space-y-6">
    <!-- Filter -->
    <FilterLaporan :loading="store.loading" @generate="handleGenerate" />

    <!-- Ringkasan -->
    <div v-if="store.data.length" class="grid grid-cols-3 gap-4">
      <div class="card text-center">
        <p class="text-3xl font-bold text-gray-900">{{ store.ringkasan.total }}</p>
        <p class="text-sm text-gray-500 mt-1">Total Surat</p>
      </div>
      <div class="card text-center">
        <p class="text-3xl font-bold text-blue-600">{{ store.ringkasan.surat_masuk }}</p>
        <p class="text-sm text-gray-500 mt-1">Surat Masuk</p>
      </div>
      <div class="card text-center">
        <p class="text-3xl font-bold text-purple-600">{{ store.ringkasan.surat_keluar }}</p>
        <p class="text-sm text-gray-500 mt-1">Surat Keluar</p>
      </div>
    </div>

    <!-- Tabel + Export -->
    <div v-if="store.data.length" class="card p-0 overflow-hidden">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h3 class="font-semibold text-gray-900">Data Laporan</h3>
          <p class="text-xs text-gray-400 mt-0.5">
            Periode: {{ formatDate(store.periode.tanggal_mulai) }} — {{ formatDate(store.periode.tanggal_akhir) }}
          </p>
        </div>
        <ExportLaporan :data="store.data" :periode="store.periode" />
      </div>
      <TabelLaporan :data="store.data" />
    </div>
  </div>
</template>

<script setup>
import { useLaporanStore }  from '@/stores/laporan.js'
import { useNotification }  from '@/composables/useNotification.js'
import FilterLaporan from '@/components/laporan/FilterLaporan.vue'
import TabelLaporan  from '@/components/laporan/TabelLaporan.vue'
import ExportLaporan from '@/components/laporan/ExportLaporan.vue'
import { formatDate } from '@/utils/formatDate.js'

const store = useLaporanStore()
const { error } = useNotification()

async function handleGenerate(params) {
  try {
    await store.fetchLaporan(params)
  } catch (err) {
    error(err.response?.data?.message || 'Gagal memuat laporan.')
  }
}
</script>