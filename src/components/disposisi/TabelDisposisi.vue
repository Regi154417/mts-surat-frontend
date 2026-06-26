<template>
  <AppTable :columns="columns" :data="data" :loading="loading" empty-text="Belum ada disposisi.">
    <template #cell-nomor_surat="{ row }">
      <span class="font-medium text-gray-900">{{ row.nomor_surat }}</span>
    </template>

    <template #cell-perihal="{ row }">
      <span class="text-gray-600 line-clamp-1">{{ row.perihal }}</span>
    </template>

    <template #cell-tanggal_kirim="{ row }">
      {{ formatDateShort(row.tanggal_kirim) }}
    </template>

    <template #cell-status="{ row }">
      <AppBadge :value="row.status" type="disposisi" />
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
          v-if="canProses && row.status === 'menunggu'"
        >
          📝 Isi Arahan
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
  data:      { type: Array, default: () => [] },
  loading:   { type: Boolean, default: false },
  canProses: { type: Boolean, default: false }
})

defineEmits(['detail', 'proses'])

const columns = [
  { key: 'nomor_surat',       label: 'Nomor Surat' },
  { key: 'pengirim',          label: 'Pengirim' },
  { key: 'perihal',           label: 'Perihal' },
  { key: 'dikirim_oleh_nama', label: 'Dikirim Oleh' },
  { key: 'tanggal_kirim',     label: 'Tgl. Kirim' },
  { key: 'status',            label: 'Status' },
  { key: 'aksi',              label: 'Aksi', class: 'w-44' }
]
</script>