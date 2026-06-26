<template>
  <AppTable :columns="columns" :data="data" :loading="loading" empty-text="Belum ada surat keluar.">
    <template #cell-nomor_surat="{ row }">
      <span class="font-medium text-gray-900">{{ row.nomor_surat }}</span>
    </template>

    <template #cell-perihal="{ row }">
      <span class="text-gray-600 line-clamp-2">{{ row.perihal }}</span>
    </template>

    <template #cell-tanggal_surat="{ row }">
      {{ formatDateShort(row.tanggal_surat) }}
    </template>

    <template #cell-status_persetujuan="{ row }">
      <AppBadge :value="row.status_persetujuan" type="persetujuan" />
    </template>

    <template #cell-file_path="{ row }">
      <a v-if="row.file_path" :href="row.file_path" target="_blank"
         class="text-primary-600 hover:underline text-xs inline-flex items-center gap-1">
        📎 Lihat
      </a>
      <span v-else class="text-gray-400 text-xs">-</span>
    </template>

    <template #cell-aksi="{ row }">
      <div class="flex items-center gap-2">
        <AppButton size="sm" variant="ghost" @click="$emit('detail', row)">
          👁️ Detail
        </AppButton>
        <AppButton
          size="sm" variant="secondary"
          @click="$emit('edit', row)"
          v-if="canEdit && row.status_persetujuan === 'menunggu'"
        >
          ✏️
        </AppButton>
        <AppButton
          size="sm" variant="danger"
          @click="$emit('delete', row)"
          v-if="canEdit && row.status_persetujuan === 'menunggu'"
        >
          🗑️
        </AppButton>
      </div>
    </template>
  </AppTable>
</template>

<script setup>
import AppTable  from '@/components/common/AppTable.vue'
import AppBadge  from '@/components/common/AppBadge.vue'
import AppButton from '@/components/common/AppButton.vue'
import { formatDateShort } from '@/utils/formatDate.js'

defineProps({
  data:    { type: Array, default: () => [] },
  loading: { type: Boolean, default: false },
  canEdit: { type: Boolean, default: false }
})

defineEmits(['detail', 'edit', 'delete'])

const columns = [
  { key: 'nomor_surat',       label: 'Nomor Surat' },
  { key: 'tujuan',            label: 'Tujuan' },
  { key: 'perihal',           label: 'Perihal' },
  { key: 'tanggal_surat',     label: 'Tgl. Surat' },
  { key: 'status_persetujuan', label: 'Status' },
  { key: 'file_path',         label: 'File', class: 'w-20' },
  { key: 'aksi',              label: 'Aksi', class: 'w-40' }
]
</script>