<template>
  <div class="space-y-6">
    <FilterArsip @cari="handleCari" @reset="handleReset" />

    <div class="card p-0 overflow-hidden">
      <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 class="font-semibold text-gray-900">
          Hasil Arsip
          <span class="text-gray-400 font-normal text-sm ml-1">({{ store.list.length }} data)</span>
        </h3>
      </div>
      <TabelArsip :data="store.list" :loading="store.loading" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useArsipStore } from '@/stores/arsip.js'
import FilterArsip from '@/components/arsip/FilterArsip.vue'
import TabelArsip  from '@/components/arsip/TabelArsip.vue'

const store = useArsipStore()

function handleCari(params) { store.fetchAll(params) }
function handleReset()      { store.fetchAll() }

onMounted(() => store.fetchAll())
</script>