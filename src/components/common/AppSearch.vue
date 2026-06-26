<template>
  <div class="flex items-center gap-3 flex-wrap">
    <!-- Input Pencarian -->
    <div class="relative flex-1 min-w-48">
      <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @keyup.enter="$emit('search')"
        type="text"
        :placeholder="placeholder"
        class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm
               focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
    </div>

    <!-- Slot untuk filter tambahan -->
    <slot />

    <!-- Tombol Search -->
    <AppButton @click="$emit('search')" size="md">
      Cari
    </AppButton>

    <!-- Tombol Reset -->
    <AppButton variant="secondary" @click="$emit('reset')">
      Reset
    </AppButton>
  </div>
</template>

<script setup>
import AppButton from './AppButton.vue'

defineProps({
  modelValue:  { type: String, default: '' },
  placeholder: { type: String, default: 'Cari...' }
})

defineEmits(['update:modelValue', 'search', 'reset'])
</script>