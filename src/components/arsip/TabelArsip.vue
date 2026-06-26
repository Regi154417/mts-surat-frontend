<template>
  <AppTable :columns="columns" :data="data" :loading="loading" empty-text="Tidak ada data arsip.">
    <template #cell-nomor_surat="{ row }">
      <span class="font-medium text-gray-900">{{ row.nomor_surat }}</span>
    </template>

    <template #cell-jenis="{ row }">
      <AppBadge :value="row.jenis" type="jenis" />
    </template>

    <template #cell-perihal="{ row }">
      <span class="text-gray-600 line-clamp-2">{{ row.perihal }}</span>
    </template>

    <template #cell-tanggal_surat="{ row }">
      {{ formatDateShort(row.tanggal_surat) }}
    </template>

    <template #cell-status="{ row }">
      <AppBadge
        :value="row.status"
        :type="row.jenis === 'masuk' ? 'disposisi' : 'persetujuan'"
      />
    </template>

    <template #cell-file_path="{ row }">
      <a v-if="row.file_path" :href="row.file_path" target="_blank"
         class="text-primary-600 hover:underline text-xs inline-flex items-center gap-1">
        📎 Lihat
      </a>
      <span v-else class="text-gray-400 text-xs">-</span>
    </template>
  </AppTable>
</template>

<script setup>
import AppTable from '@/components/common/AppTable.vue'
import AppBadge from '@/components/common/AppBadge.vue'
import { formatDateShort } from '@/utils/formatDate.js'

defineProps({
  data:    { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

const columns = [
  { key: 'nomor_surat',  label: 'Nomor Surat' },
  { key: 'jenis',        label: 'Jenis' },
  { key: 'pihak',        label: 'Pengirim / Tujuan' },
  { key: 'perihal',      label: 'Perihal' },
  { key: 'tanggal_surat', label: 'Tgl. Surat' },
  { key: 'status',       label: 'Status' },
  { key: 'file_path',    label: 'File', class: 'w-20' }
]
</script>