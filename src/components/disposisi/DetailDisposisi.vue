<template>
  <div v-if="data" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Nomor Surat</p>
        <p class="text-sm font-semibold text-gray-900">{{ data.nomor_surat }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Status</p>
        <AppBadge :value="data.status" type="disposisi" />
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Pengirim Surat</p>
        <p class="text-sm text-gray-700">{{ data.pengirim }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Dikirim Oleh</p>
        <p class="text-sm text-gray-700">{{ data.dikirim_oleh_nama || '-' }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Tanggal Kirim</p>
        <p class="text-sm text-gray-700">{{ formatDate(data.tanggal_kirim) }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Tanggal Selesai</p>
        <p class="text-sm text-gray-700">{{ data.tanggal_selesai ? formatDate(data.tanggal_selesai) : '-' }}</p>
      </div>
    </div>

    <div>
      <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Perihal Surat</p>
      <p class="text-sm text-gray-700">{{ data.perihal }}</p>
    </div>

    <div>
      <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Arahan / Instruksi</p>
      <div class="bg-gray-50 rounded-lg p-3 min-h-16">
        <p class="text-sm text-gray-700 leading-relaxed">{{ data.arahan || 'Belum ada arahan.' }}</p>
      </div>
    </div>

    <div v-if="data.file_path">
      <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">File Surat</p>
      <a :href="data.file_path" target="_blank"
         class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600
                rounded-lg text-sm hover:bg-blue-100 transition-colors border border-blue-200">
        📎 Lihat / Unduh File
      </a>
    </div>
  </div>
</template>

<script setup>
import AppBadge from '@/components/common/AppBadge.vue'
import { formatDate } from '@/utils/formatDate.js'

defineProps({
  data: { type: Object, default: null }
})
</script>