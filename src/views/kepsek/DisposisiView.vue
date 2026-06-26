<template>
  <div class="space-y-6">
    <div class="card">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-gray-900">Disposisi</h2>
          <p class="text-sm text-gray-500">Isi arahan dan pantau status disposisi</p>
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
        :can-proses="true"
        @detail="openDetail"
        @proses="openProses"
      />
    </div>

    <!-- Modal Detail -->
    <AppModal v-model="showDetail" title="Detail Disposisi" size="lg">
      <DetailDisposisi :data="store.detail" />
    </AppModal>

    <!-- Modal Isi Arahan -->
    <AppModal v-model="showProses" title="Isi Arahan Disposisi" size="md">
      <form @submit.prevent="handleUpdate" class="space-y-5">
        <!-- Info Surat -->
        <div v-if="selectedItem" class="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
          <p class="text-xs text-blue-500 uppercase font-semibold">Surat Masuk</p>
          <p class="text-sm font-medium text-blue-900">{{ selectedItem.nomor_surat }}</p>
          <p class="text-sm text-blue-700">{{ selectedItem.perihal }}</p>
        </div>

        <!-- Arahan -->
        <div>
          <label class="label-field">Arahan <span class="text-red-500">*</span></label>
          <textarea v-model="arahanForm.arahan" class="input-field resize-none" rows="4"
                    placeholder="Tulis arahan / instruksi tindak lanjut..." required />
        </div>

        <!-- Status -->
        <div>
          <label class="label-field">Ubah Status</label>
          <select v-model="arahanForm.status" class="input-field">
            <option value="menunggu">Menunggu</option>
            <option value="diproses">Diproses</option>
            <option value="selesai">Selesai</option>
          </select>
        </div>

        <div class="flex items-center justify-end gap-3">
          <AppButton type="button" variant="secondary" @click="showProses = false">Batal</AppButton>
          <AppButton type="submit" :loading="prosesLoading">💾 Simpan Arahan</AppButton>
        </div>
      </form>
    </AppModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDisposisiStore } from '@/stores/disposisi.js'
import { useNotification }   from '@/composables/useNotification.js'

import AppModal        from '@/components/common/AppModal.vue'
import AppButton       from '@/components/common/AppButton.vue'
import TabelDisposisi  from '@/components/disposisi/TabelDisposisi.vue'
import DetailDisposisi from '@/components/disposisi/DetailDisposisi.vue'

const store  = useDisposisiStore()
const { success, error } = useNotification()

const filterStatus  = ref('')
const showDetail    = ref(false)
const showProses    = ref(false)
const selectedItem  = ref(null)
const prosesLoading = ref(false)
const arahanForm    = ref({ arahan: '', status: 'diproses' })

function load() {
  const p = {}
  if (filterStatus.value) p.status = filterStatus.value
  store.fetchAll(p)
}

async function openDetail(row) {
  await store.fetchById(row.id)
  showDetail.value = true
}

function openProses(row) {
  selectedItem.value  = row
  arahanForm.value    = { arahan: row.arahan || '', status: row.status || 'diproses' }
  showProses.value    = true
}

async function handleUpdate() {
  prosesLoading.value = true
  try {
    await store.update(selectedItem.value.id, arahanForm.value)
    success('Arahan disposisi berhasil disimpan.')
    showProses.value = false
    load()
  } catch (err) {
    error(err.response?.data?.message || 'Gagal menyimpan arahan.')
  } finally {
    prosesLoading.value = false
  }
}

onMounted(load)
</script>