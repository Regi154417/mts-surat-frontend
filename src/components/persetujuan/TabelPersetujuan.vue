<template>
  <AppTable :columns="columns" :data="data" :loading="loading"
            empty-text="Tidak ada surat keluar yang menunggu persetujuan.">
    <template #cell-nomor_surat="{ row }">
      <span class="font-medium text-gray-900">{{ row.nomor_surat }}</span>
    </template>

    <template #cell-perihal="{ row }">
      <span class="text-gray-600 line-clamp-2">{{ row.perihal }}</span>
    </template>

    <template #cell-status="{ row }">
      <AppBadge :value="row.status" type="persetujuan" />
    </template>

    <template #cell-tanggal_keputusan="{ row }">
      {{ row.tanggal_keputusan ? formatDateShort(row.tanggal_keputusan) : '-' }}
    </template>

    <template #cell-aksi="{ row }">
      <div class="flex items-center gap-2">
        <AppButton size="sm" variant="ghost" @click="$emit('detail', row)">
          👁️ Detail
        </AppButton>
        <AppButton
          size="sm"
          variant="primary"
          @click="$emit('proses', row)"
          v-if="row.status === 'menunggu'"
        >
          ✅ Proses
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
  loading: { type: Boolean, default: false }
})

defineEmits(['detail', 'proses'])

const columns = [
  { key: 'nomor_surat',       label: 'Nomor Surat' },
  { key: 'tujuan',            label: 'Tujuan' },
  { key: 'perihal',           label: 'Perihal' },
  { key: 'disetujui_oleh_nama', label: 'Diproses Oleh' },
  { key: 'status',            label: 'Status' },
  { key: 'tanggal_keputusan', label: 'Tgl. Keputusan' },
  { key: 'aksi',              label: 'Aksi', class: 'w-36' }
]
</script>