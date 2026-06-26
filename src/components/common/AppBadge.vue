<template>
  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', colorClass]">
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import {
  LABEL_STATUS_DISPOSISI,
  LABEL_STATUS_PERSETUJUAN,
  COLOR_STATUS_DISPOSISI,
  COLOR_STATUS_PERSETUJUAN
} from '@/utils/constants.js'

const props = defineProps({
  value: { type: String, required: true },
  type:  { type: String, default: 'disposisi' } // disposisi | persetujuan | jenis
})

const label = computed(() => {
  if (props.type === 'disposisi')   return LABEL_STATUS_DISPOSISI[props.value]  || props.value
  if (props.type === 'persetujuan') return LABEL_STATUS_PERSETUJUAN[props.value] || props.value
  if (props.type === 'jenis') {
    return props.value === 'masuk' ? 'Surat Masuk' : 'Surat Keluar'
  }
  return props.value
})

const colorClass = computed(() => {
  const colorMap = {
    green:  'bg-green-100 text-green-700',
    yellow: 'bg-yellow-100 text-yellow-700',
    blue:   'bg-blue-100 text-blue-700',
    gray:   'bg-gray-100 text-gray-600',
    red:    'bg-red-100 text-red-700',
    masuk:  'bg-blue-100 text-blue-700',
    keluar: 'bg-purple-100 text-purple-700'
  }

  if (props.type === 'disposisi') {
    const color = COLOR_STATUS_DISPOSISI[props.value]
    return colorMap[color] || colorMap.gray
  }
  if (props.type === 'persetujuan') {
    const color = COLOR_STATUS_PERSETUJUAN[props.value]
    return colorMap[color] || colorMap.gray
  }
  if (props.type === 'jenis') {
    return colorMap[props.value] || colorMap.gray
  }
  return colorMap.gray
})
</script>