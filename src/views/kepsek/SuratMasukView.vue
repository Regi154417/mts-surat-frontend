<template>
  <div class="space-y-6">
    <div class="card">
      <div>
        <h2 class="text-lg font-semibold text-gray-900">Surat Masuk</h2>
        <p class="text-sm text-gray-500">Lihat surat masuk dan kirim disposisi</p>
      </div>
      <div class="mt-4">
        <AppSearch
          v-model="search"
          placeholder="Cari nomor surat, pengirim, perihal..."
          @search="handleCari"
          @reset="handleReset"
        />
      </div>
    </div>

    <div class="card p-0 overflow-hidden">
      <TabelSuratMasuk
        :data="store.list"
        :loading="store.loading"
        :can-edit="false"
        :can-disposisi="true"
        @detail="openDetail"
        @disposisi="openDisposisi"
      />
      <div class="px-6 py-4">
        <AppPagination
          :current-page="store.pagination.page"
          :total-pages="store.pagination.totalPages"
          :total="store.pagination.total"
          :limit="store.pagination.limit"
          @page-change="handlePageChange"
        />
      </div>
    </div>

    <!-- Modal Detail -->
    <AppModal v-model="showDetail" title="Detail Surat Masuk" size="lg">
      <DetailSuratMasuk :data="store.detail" />
    </AppModal>

    <!-- Modal Kirim Disposisi -->
    <AppModal v-model="showDisposisi" title="Kirim Disposisi" size="md">
      <FormDisposisi
        :surat-data="selectedSurat"
        :loading="disposisiLoading"
        @submit="handleKirimDisposisi"
        @cancel="showDisposisi = false"
      />
    </AppModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSuratMasukStore } from '@/stores/suratMasuk.js'
import { useDisposisiStore }  from '@/stores/disposisi.js'
import { useNotification }    from '@/composables/useNotification.js'

import AppSearch       from '@/components/common/AppSearch.vue'
import AppModal        from '@/components/common/AppModal.vue'
import AppPagination   from '@/components/common/AppPagination.vue'
import TabelSuratMasuk from '@/components/suratMasuk/TabelSuratMasuk.vue'
import DetailSuratMasuk from '@/components/suratMasuk/DetailSuratMasuk.vue'
import FormDisposisi   from '@/components/disposisi/FormDisposisi.vue'

const store          = useSuratMasukStore()
const disposisiStore = useDisposisiStore()
const { success, error } = useNotification()

const search        = ref('')
const currentPage   = ref(1)
const showDetail    = ref(false)
const showDisposisi = ref(false)
const selectedSurat = ref(null)
const disposisiLoading = ref(false)

const load = () => store.fetchAll({ page: currentPage.value, limit: 10, search: search.value || undefined })
const handleCari  = () => { currentPage.value = 1; load() }
const handleReset = () => { search.value = ''; currentPage.value = 1; load() }
const handlePageChange = (p) => { currentPage.value = p; load() }

async function openDetail(row) {
  await store.fetchById(row.id)
  showDetail.value = true
}

function openDisposisi(row) {
  selectedSurat.value = row
  showDisposisi.value = true
}

async function handleKirimDisposisi(payload) {
  disposisiLoading.value = true
  try {
    await disposisiStore.create(payload)
    success('Disposisi berhasil dikirim.')
    showDisposisi.value = false
    load()
  } catch (err) {
    error(err.response?.data?.message || 'Gagal mengirim disposisi.')
  } finally {
    disposisiLoading.value = false
  }
}

onMounted(load)
</script>