<template>
  <div v-if="data" class="space-y-6">
    <!-- Info Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Nomor Surat</p>
        <p class="text-sm font-semibold text-gray-900">{{ data.nomor_surat }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Status Disposisi</p>
        <AppBadge :value="data.status_disposisi" type="disposisi" />
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Tanggal Surat</p>
        <p class="text-sm text-gray-700">{{ formatDate(data.tanggal_surat) }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Tanggal Terima</p>
        <p class="text-sm text-gray-700">{{ formatDate(data.tanggal_terima) }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Pengirim</p>
        <p class="text-sm text-gray-700">{{ data.pengirim }}</p>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Diinput Oleh</p>
        <p class="text-sm text-gray-700">{{ data.dibuat_oleh || '-' }}</p>
      </div>
    </div>

    <!-- Perihal -->
    <div>
      <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">Perihal</p>
      <p class="text-sm text-gray-700 leading-relaxed">{{ data.perihal }}</p>
    </div>

    <!-- File Lampiran -->
    <div v-if="data.file_path">
      <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">File Lampiran</p>
      <a
        :href="data.file_path"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600
               rounded-lg text-sm hover:bg-blue-100 transition-colors border border-blue-200"
      >
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