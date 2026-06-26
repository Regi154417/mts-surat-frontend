<template>
  <div class="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md
              transition-shadow duration-200">
    <div class="flex items-start justify-between">
      <div>
        <p class="text-sm text-gray-500 font-medium">{{ label }}</p>
        <p class="text-3xl font-bold text-gray-900 mt-1">
          {{ loading ? '...' : value }}
        </p>
        <p v-if="subtitle" class="text-xs text-gray-400 mt-1">{{ subtitle }}</p>
      </div>
      <div :class="['w-12 h-12 rounded-xl flex items-center justify-center text-2xl', bgClass]">
        {{ icon }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label:    { type: String, required: true },
  value:    { type: [Number, String], default: 0 },
  icon:     { type: String, default: '📄' },
  color:    { type: String, default: 'blue' },
  subtitle: { type: String, default: null },
  loading:  { type: Boolean, default: false }
})

const bgClass = computed(() => {
  const map = {
    blue:   'bg-blue-100',
    green:  'bg-green-100',
    yellow: 'bg-yellow-100',
    red:    'bg-red-100',
    purple: 'bg-purple-100'
  }
  return map[props.color] || map.blue
})
</script>