<template>
  <div class="space-y-6">
    <div class="card">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Disposisi</h2>
          <p class="text-sm text-gray-500">Pantau status disposisi surat masuk</p>
        </div>
        <select v-model="filterStatus" @change="load" class="input-field w-44">
          <option value="">Semua Status</option>
          <option value="menunggu">Menunggu</option>
          <option value="diproses">Diproses</option>
          <option value="selesai">Selesai</option>
        </select>
      </div>
    </div>

    <div class="card p-0 overflow-hidden">
      <TabelDisposisi
        :data="store.list"
        :loading="store.loading"
        :can-proses="false"
        @detail="openDetail"
      />
    </div>

    <!-- Modal Detail -->
    <AppModal v-model="showDetail" title="Detail Disposisi" size="lg">
      <DetailDisposisi :data="store.detail" />
    </AppModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDisposisiStore } from '@/stores/disposisi.js'
import AppModal       from '@/components/common/AppModal.vue'
import TabelDisposisi from '@/components/disposisi/TabelDisposisi.vue'
import DetailDisposisi from '@/components/disposisi/DetailDisposisi.vue'

const store        = useDisposisiStore()
const filterStatus = ref('')
const showDetail   = ref(false)

function load() {
  const p = {}
  if (filterStatus.value) p.status = filterStatus.value
  store.fetchAll(p)
}

async function openDetail(row) {
  await store.fetchById(row.id)
  showDetail.value = true
}

onMounted(load)
</script>