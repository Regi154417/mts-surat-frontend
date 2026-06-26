<template>
  <div v-if="totalPages > 1" class="flex items-center justify-between mt-4">
    <!-- Info -->
    <p class="text-sm text-gray-500">
      Menampilkan
      <span class="font-medium text-gray-700">{{ startIndex }}</span>–<span class="font-medium text-gray-700">{{ endIndex }}</span>
      dari <span class="font-medium text-gray-700">{{ total }}</span> data
    </p>

    <!-- Navigation -->
    <div class="flex items-center gap-1">
      <!-- Prev -->
      <button
        @click="$emit('page-change', currentPage - 1)"
        :disabled="currentPage <= 1"
        class="px-3 py-1.5 rounded-lg text-sm border border-gray-300 text-gray-600
               hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        ‹ Sebelumnya
      </button>

      <!-- Pages -->
      <button
        v-for="p in visiblePages"
        :key="p"
        @click="p !== '...' && $emit('page-change', p)"
        :class="[
          'w-9 h-9 rounded-lg text-sm font-medium transition-colors',
          p === currentPage
            ? 'bg-primary-600 text-white'
            : p === '...'
              ? 'cursor-default text-gray-400'
              : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
        ]"
      >
        {{ p }}
      </button>

      <!-- Next -->
      <button
        @click="$emit('page-change', currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="px-3 py-1.5 rounded-lg text-sm border border-gray-300 text-gray-600
               hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Berikutnya ›
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages:  { type: Number, required: true },
  total:       { type: Number, default: 0 },
  limit:       { type: Number, default: 10 }
})

defineEmits(['page-change'])

const startIndex = computed(() => (props.currentPage - 1) * props.limit + 1)
const endIndex   = computed(() => Math.min(props.currentPage * props.limit, props.total))

const visiblePages = computed(() => {
  const pages = []
  const { currentPage: cp, totalPages: tp } = props

  if (tp <= 7) {
    for (let i = 1; i <= tp; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (cp > 3) pages.push('...')
  for (let i = Math.max(2, cp - 1); i <= Math.min(tp - 1, cp + 1); i++) pages.push(i)
  if (cp < tp - 2) pages.push('...')
  pages.push(tp)
  return pages
})
</script>