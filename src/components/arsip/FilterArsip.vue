<template>
  <div class="card mb-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Kata Kunci -->
      <div class="md:col-span-2">
        <label class="label-field">Kata Kunci</label>
        <input
          v-model="localFilter.keyword"
          type="text"
          class="input-field"
          placeholder="Nomor surat, perihal, pihak..."
        />
      </div>

      <!-- Jenis Surat -->
      <div>
        <label class="label-field">Jenis Surat</label>
        <select v-model="localFilter.jenis" class="input-field">
          <option value="">Semua Jenis</option>
          <option value="masuk">Surat Masuk</option>
          <option value="keluar">Surat Keluar</option>
        </select>
      </div>

      <!-- Tombol -->
      <div class="flex items-end gap-2">
        <AppButton class="flex-1" @click="handleCari">🔍 Cari</AppButton>
        <AppButton variant="secondary" @click="handleReset">Reset</AppButton>
      </div>
    </div>

    <!-- Filter Tanggal -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      <div>
        <label class="label-field">Dari Tanggal</label>
        <input v-model="localFilter.tanggal_mulai" type="date" class="input-field" />
      </div>
      <div>
        <label class="label-field">Sampai Tanggal</label>
        <input v-model="localFilter.tanggal_akhir" type="date" class="input-field" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from '@/components/common/AppButton.vue'

const emit = defineEmits(['cari', 'reset'])

const localFilter = ref({
  keyword:       '',
  jenis:         '',
  tanggal_mulai: '',
  tanggal_akhir: ''
})

function handleCari() {
  const params = {}
  if (localFilter.value.keyword)      params.keyword       = localFilter.value.keyword
  if (localFilter.value.jenis)        params.jenis         = localFilter.value.jenis
  if (localFilter.value.tanggal_mulai) params.tanggal_mulai = localFilter.value.tanggal_mulai
  if (localFilter.value.tanggal_akhir) params.tanggal_akhir = localFilter.value.tanggal_akhir
  emit('cari', params)
}

function handleReset() {
  localFilter.value = { keyword: '', jenis: '', tanggal_mulai: '', tanggal_akhir: '' }
  emit('reset')
}
</script>