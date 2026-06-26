<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="closeOnBackdrop && $emit('update:modelValue', false)"
        />

        <!-- Modal Content -->
        <div
          :class="[
            'relative bg-white rounded-2xl shadow-2xl w-full overflow-hidden',
            sizeClass
          ]"
          @click.stop
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
            <button
              @click="$emit('update:modelValue', false)"
              class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100
                     transition-colors text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <!-- Body -->
          <div class="px-6 py-4 overflow-y-auto" :style="{ maxHeight: maxHeight }">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-6 py-4 border-t border-gray-100 bg-gray-50">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue:       { type: Boolean, default: false },
  title:            { type: String, default: 'Modal' },
  size:             { type: String, default: 'md' },  // sm | md | lg | xl
  closeOnBackdrop:  { type: Boolean, default: true },
  maxHeight:        { type: String, default: '70vh' }
})

defineEmits(['update:modelValue'])

const sizeClass = computed(() => {
  const map = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' }
  return map[props.size] || map.md
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: all 0.25s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .relative { transform: scale(0.95) translateY(-10px); }
.modal-leave-to .relative { transform: scale(0.95) translateY(-10px); }
</style>