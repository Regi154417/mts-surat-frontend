<template>
  <div class="card">
    <h3 class="font-semibold text-gray-900 mb-4">Filter Laporan</h3>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <!-- Dari Tanggal -->
      <div>
        <label class="label-field">Dari Tanggal <span class="text-red-500">*</span></label>
        <input v-model="form.tanggal_mulai" type="date" class="input-field" required />
      </div>

      <!-- Sampai Tanggal -->
      <div>
        <label class="label-field">Sampai Tanggal <span class="text-red-500">*</span></label>
        <input v-model="form.tanggal_akhir" type="date" class="input-field" required />
      </div>

      <!-- Jenis -->
      <div>
        <label class="label-field">Jenis Surat</label>
        <select v-model="form.jenis" class="input-field">
          <option value="semua">Semua</option>
          <option value="masuk">Surat Masuk</option>
          <option value="keluar">Surat Keluar</option>
        </select>
      </div>

      <!-- Tombol Generate -->
      <div class="flex items-end">
        <AppButton
          class="w-full"
          @click="handleGenerate"
          :loading="loading"
          :disabled="!form.tanggal_mulai || !form.tanggal_akhir"
        >
          📊 Generate Laporan
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from '@/components/common/AppButton.vue'

const props = defineProps({
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['generate'])

const form = ref({
  tanggal_mulai: '',
  tanggal_akhir: '',
  jenis: 'semua'
})

function handleGenerate() {
  if (!form.value.tanggal_mulai || !form.value.tanggal_akhir) return
  emit('generate', { ...form.value })
}
</script>