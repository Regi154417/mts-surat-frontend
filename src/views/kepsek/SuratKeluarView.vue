<template>
  <div class="space-y-6">
    <div class="card">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Surat Keluar</h2>
        <p class="text-sm text-gray-500">Beri persetujuan pada surat keluar</p>
      </div>
      <div class="mt-4">
        <AppSearch
          v-model="search"
          placeholder="Cari nomor surat, tujuan, perihal..."
          @search="handleCari"
          @reset="handleReset"
        >
          <select v-model="filterStatus" class="input-field w-44">
            <option value="">Semua Status</option>
            <option value="menunggu">Menunggu</option>
            <option value="disetujui">Disetujui</option>
            <option value="ditolak">Ditolak</option>
          </select>
        </AppSearch>
      </div>
    </div>

    <div class="card p-0 overflow-hidden">
      <TabelPersetujuan
        :data="persetujuanStore.list"
        :loading="persetujuanStore.loading"
        @detail="openDetail"
        @proses="openProses"
      />
    </div>

    <!-- Modal Detail -->
    <AppModal v-model="showDetail" title="Detail Persetujuan" size="lg">
      <DetailSuratKeluar :data="selectedItem" />
    </AppModal>

    <!-- Modal Proses -->
    <AppModal v-model="showProses" title="Beri Persetujuan" size="md">
      <FormPersetujuan
        :surat-data="selectedItem"
        :loading="prosesLoading"
        @submit="handleProses"
        @cancel="showProses = false"
      />
    </AppModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { usePersetujuanStore } from '@/stores/persetujuan.js'
import { useNotification }     from '@/composables/useNotification.js'

import AppSearch          from '@/components/common/AppSearch.vue'
import AppModal           from '@/components/common/AppModal.vue'
import TabelPersetujuan   from '@/components/persetujuan/TabelPersetujuan.vue'
import FormPersetujuan    from '@/components/persetujuan/FormPersetujuan.vue'
import DetailSuratKeluar  from '@/components/suratKeluar/DetailSuratKeluar.vue'

const persetujuanStore = usePersetujuanStore()
const { success, error } = useNotification()

const search       = ref('')
const filterStatus = ref('')
const showDetail   = ref(false)
const showProses   = ref(false)
const selectedItem = ref(null)
const prosesLoading = ref(false)

function load() {
  const p = {}
  if (filterStatus.value) p.status = filterStatus.value
  persetujuanStore.fetchAll(p)
}

const handleCari  = () => { load() }
const handleReset = () => { search.value = ''; filterStatus.value = ''; load() }

function openDetail(row) {
  selectedItem.value = { ...row, id: row.surat_keluar_id }
  showDetail.value   = true
}

function openProses(row) {
  selectedItem.value = row
  showProses.value   = true
}

async function handleProses(payload) {
  prosesLoading.value = true
  try {
    await persetujuanStore.create(payload)
    success(`Surat keluar berhasil ${payload.status === 'disetujui' ? 'disetujui' : 'ditolak'}.`)
    showProses.value = false
    load()
  } catch (err) {
    error(err.response?.data?.message || 'Gagal memproses persetujuan.')
  } finally {
    prosesLoading.value = false
  }
}

onMounted(load)
</script>