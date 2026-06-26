<template>
  <div class="space-y-6">
    <!-- Toolbar -->
    <div class="card">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Surat Masuk</h2>
          <p class="text-sm text-gray-500">Kelola semua surat masuk</p>
        </div>
        <AppButton @click="openTambah">
          ➕ Tambah Surat Masuk
        </AppButton>
      </div>

      <!-- Filter -->
      <div class="mt-4">
        <AppSearch
          v-model="search"
          placeholder="Cari nomor surat, pengirim, perihal..."
          @search="handleCari"
          @reset="handleReset"
        >
          <select v-model="filterStatus" class="input-field w-44">
            <option value="">Semua Status</option>
            <option value="belum_disposisi">Belum Disposisi</option>
            <option value="menunggu">Menunggu</option>
            <option value="diproses">Diproses</option>
            <option value="selesai">Selesai</option>
          </select>
        </AppSearch>
      </div>
    </div>

    <!-- Tabel -->
    <div class="card p-0 overflow-hidden">
      <TabelSuratMasuk
        :data="store.list"
        :loading="store.loading"
        :can-edit="true"
        :can-disposisi="true"
        @detail="openDetail"
        @edit="openEdit"
        @delete="handleDelete"
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

    <!-- Modal Tambah / Edit -->
    <AppModal
      v-model="showForm"
      :title="editData ? 'Edit Surat Masuk' : 'Tambah Surat Masuk'"
      size="lg"
    >
      <FormSuratMasuk
        :edit-data="editData"
        :loading="formLoading"
        @submit="handleSubmit"
        @cancel="showForm = false"
      />
    </AppModal>

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
import AppButton       from '@/components/common/AppButton.vue'
import AppModal        from '@/components/common/AppModal.vue'
import AppPagination   from '@/components/common/AppPagination.vue'
import TabelSuratMasuk from '@/components/suratMasuk/TabelSuratMasuk.vue'
import FormSuratMasuk  from '@/components/suratMasuk/FormSuratMasuk.vue'
import DetailSuratMasuk from '@/components/suratMasuk/DetailSuratMasuk.vue'
import FormDisposisi   from '@/components/disposisi/FormDisposisi.vue'

const store          = useSuratMasukStore()
const disposisiStore = useDisposisiStore()
const { success, error } = useNotification()

const search       = ref('')
const filterStatus = ref('')
const currentPage  = ref(1)

const showForm       = ref(false)
const showDetail     = ref(false)
const showDisposisi  = ref(false)
const editData       = ref(null)
const selectedSurat  = ref(null)
const formLoading    = ref(false)
const disposisiLoading = ref(false)

function getParams() {
  const p = { page: currentPage.value, limit: 10 }
  if (search.value)       p.search = search.value
  if (filterStatus.value) p.status = filterStatus.value
  return p
}

function load() {
  store.fetchAll(getParams())
}

function handleCari() {
  currentPage.value = 1
  load()
}

function handleReset() {
  search.value       = ''
  filterStatus.value = ''
  currentPage.value  = 1
  load()
}

function handlePageChange(p) {
  currentPage.value = p
  load()
}

function openTambah() {
  editData.value = null
  showForm.value = true
}

async function openEdit(row) {
  editData.value = row
  showForm.value = true
}

async function openDetail(row) {
  await store.fetchById(row.id)
  showDetail.value = true
}

function openDisposisi(row) {
  selectedSurat.value = row
  showDisposisi.value = true
}

async function handleSubmit(formData) {
  formLoading.value = true
  try {
    if (editData.value) {
      await store.update(editData.value.id, formData)
      success('Surat masuk berhasil diperbarui.')
    } else {
      await store.create(formData)
      success('Surat masuk berhasil ditambahkan.')
    }
    showForm.value = false
    load()
  } catch (err) {
    error(err.response?.data?.message || 'Gagal menyimpan data.')
  } finally {
    formLoading.value = false
  }
}

async function handleDelete(row) {
  if (!confirm(`Hapus surat masuk "${row.nomor_surat}"?`)) return
  try {
    await store.remove(row.id)
    success('Surat masuk berhasil dihapus.')
    load()
  } catch (err) {
    error(err.response?.data?.message || 'Gagal menghapus data.')
  }
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