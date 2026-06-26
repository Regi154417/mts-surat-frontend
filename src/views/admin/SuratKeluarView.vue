<template>
  <div class="space-y-6">
    <!-- Toolbar -->
    <div class="card">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Surat Keluar</h2>
          <p class="text-sm text-gray-500">Kelola semua surat keluar</p>
        </div>
        <AppButton @click="openTambah">➕ Tambah Surat Keluar</AppButton>
      </div>

      <!-- Filter -->
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

    <!-- Tabel -->
    <div class="card p-0 overflow-hidden">
      <TabelSuratKeluar
        :data="store.list"
        :loading="store.loading"
        :can-edit="true"
        @detail="openDetail"
        @edit="openEdit"
        @delete="handleDelete"
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

    <!-- Modal Tambah / Edit -->
    <AppModal v-model="showForm" :title="editData ? 'Edit Surat Keluar' : 'Tambah Surat Keluar'" size="lg">
      <FormSuratKeluar
        :edit-data="editData"
        :loading="formLoading"
        @submit="handleSubmit"
        @cancel="showForm = false"
      />
    </AppModal>

    <!-- Modal Detail -->
    <AppModal v-model="showDetail" title="Detail Surat Keluar" size="lg">
      <DetailSuratKeluar :data="store.detail" />
    </AppModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSuratKeluarStore } from '@/stores/suratKeluar.js'
import { useNotification }     from '@/composables/useNotification.js'

import AppSearch        from '@/components/common/AppSearch.vue'
import AppButton        from '@/components/common/AppButton.vue'
import AppModal         from '@/components/common/AppModal.vue'
import AppPagination    from '@/components/common/AppPagination.vue'
import TabelSuratKeluar  from '@/components/suratKeluar/TabelSuratKeluar.vue'
import FormSuratKeluar   from '@/components/suratKeluar/FormSuratKeluar.vue'
import DetailSuratKeluar from '@/components/suratKeluar/DetailSuratKeluar.vue'

const store = useSuratKeluarStore()
const { success, error } = useNotification()

const search       = ref('')
const filterStatus = ref('')
const currentPage  = ref(1)
const showForm     = ref(false)
const showDetail   = ref(false)
const editData     = ref(null)
const formLoading  = ref(false)

function getParams() {
  const p = { page: currentPage.value, limit: 10 }
  if (search.value)       p.search = search.value
  if (filterStatus.value) p.status = filterStatus.value
  return p
}

const load = () => store.fetchAll(getParams())

function handleCari()  { currentPage.value = 1; load() }
function handleReset() { search.value = ''; filterStatus.value = ''; currentPage.value = 1; load() }
function handlePageChange(p) { currentPage.value = p; load() }
function openTambah() { editData.value = null; showForm.value = true }
function openEdit(row) { editData.value = row; showForm.value = true }

async function openDetail(row) {
  await store.fetchById(row.id)
  showDetail.value = true
}

async function handleSubmit(formData) {
  formLoading.value = true
  try {
    editData.value
      ? await store.update(editData.value.id, formData)
      : await store.create(formData)
    success(editData.value ? 'Surat keluar berhasil diperbarui.' : 'Surat keluar berhasil ditambahkan.')
    showForm.value = false
    load()
  } catch (err) {
    error(err.response?.data?.message || 'Gagal menyimpan data.')
  } finally {
    formLoading.value = false
  }
}

async function handleDelete(row) {
  if (!confirm(`Hapus surat keluar "${row.nomor_surat}"?`)) return
  try {
    await store.remove(row.id)
    success('Surat keluar berhasil dihapus.')
    load()
  } catch (err) {
    error(err.response?.data?.message || 'Gagal menghapus data.')
  }
}

onMounted(load)
</script>