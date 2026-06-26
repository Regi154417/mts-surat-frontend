<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm">
    <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <h3 class="font-semibold text-gray-900">Notifikasi Terbaru</h3>
      <span class="bg-primary-100 text-primary-700 text-xs font-medium px-2 py-0.5 rounded-full">
        {{ items.length }}
      </span>
    </div>

    <div class="divide-y divide-gray-50">
      <!-- Loading -->
      <div v-if="loading" v-for="i in 3" :key="i" class="px-6 py-4">
        <div class="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
        <div class="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
      </div>

      <!-- Empty -->
      <div v-else-if="!items.length" class="px-6 py-12 text-center">
        <span class="text-3xl block mb-2">🎉</span>
        <p class="text-gray-400 text-sm">Tidak ada notifikasi baru</p>
      </div>

      <!-- Items -->
      <div
        v-else
        v-for="item in items"
        :key="item.id"
        class="px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div class="flex items-start gap-3">
          <span class="text-xl mt-0.5">{{ typeIcon(item.type) }}</span>
          <div class="flex-1 min-w-0">
            <p class="text-sm text-gray-800 font-medium truncate">{{ item.message }}</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ item.time }}</p>
          </div>
          <span :class="['w-2 h-2 rounded-full mt-2 flex-shrink-0', dotClass(item.type)]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items:   { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

function typeIcon(type) {
  const map = {
    disposisi:   '📋',
    persetujuan: '✅',
    tolak:       '❌',
    surat:       '📄'
  }
  return map[type] || '🔔'
}

function dotClass(type) {
  const map = {
    disposisi:   'bg-blue-500',
    persetujuan: 'bg-green-500',
    tolak:       'bg-red-500',
    surat:       'bg-yellow-500'
  }
  return map[type] || 'bg-gray-400'
}
</script>