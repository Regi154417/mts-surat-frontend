<template>
  <div class="flex items-center gap-3">
    <AppButton
      variant="secondary"
      @click="handleCSV"
      :disabled="!data.length"
    >
      📥 Export CSV
    </AppButton>

    <AppButton
      variant="secondary"
      @click="handlePrint"
      :disabled="!data.length"
    >
      🖨️ Print
    </AppButton>
  </div>
</template>

<script setup>
import AppButton from '@/components/common/AppButton.vue'
import { useExport } from '@/composables/useExport.js'

const props = defineProps({
  data:    { type: Array, default: () => [] },
  periode: { type: Object, default: () => ({}) }
})

const { exportCSV, printPage } = useExport()

function handleCSV() {
  const exportData = props.data.map((row, i) => ({
    No: i + 1,
    'Nomor Surat': row.nomor_surat,
    'Jenis': row.jenis,
    'Perihal': row.perihal,
    'Pihak': row.pihak,
    'Tgl Surat': row.tanggal_surat,
    'Status': row.status
  }))
  exportCSV(exportData, `laporan_surat_${props.periode.tanggal_mulai}_sd_${props.periode.tanggal_akhir}`)
}

function handlePrint() {
  printPage()
}
</script>