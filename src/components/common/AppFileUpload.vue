<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="!required" class="text-gray-400 font-normal">(opsional)</span>
    </label>

    <!-- Drop Zone -->
    <div
      @dragover.prevent="isDragging = true"
      @dragleave="isDragging = false"
      @drop.prevent="handleDrop"
      @click="triggerInput"
      :class="[
        'border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors',
        isDragging ? 'border-primary-400 bg-primary-50' : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50',
        error ? 'border-red-400 bg-red-50' : ''
      ]"
    >
      <input
        ref="inputRef"
        type="file"
        class="hidden"
        accept=".pdf,.doc,.docx"
        @change="handleChange"
      />

      <!-- Preview File -->
      <div v-if="preview" class="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
        <div class="flex items-center gap-3">
          <span class="text-2xl">{{ fileIcon }}</span>
          <div class="text-left">
            <p class="text-sm font-medium text-gray-700 truncate max-w-48">{{ preview.name }}</p>
            <p class="text-xs text-gray-400">{{ preview.size }}</p>
          </div>
        </div>
        <button
          @click.stop="clearFile"
          class="text-red-500 hover:text-red-700 text-sm"
        >
          ✕ Hapus
        </button>
      </div>

      <!-- Existing File (edit mode) -->
      <div v-else-if="existingFile" class="flex items-center justify-between bg-blue-50 rounded-lg p-3 border border-blue-200">
        <div class="flex items-center gap-3">
          <span class="text-2xl">📎</span>
          <div class="text-left">
            <p class="text-sm text-blue-700">File saat ini tersimpan</p>
            <a
              :href="existingFile"
              target="_blank"
              class="text-xs text-blue-500 hover:underline"
              @click.stop
            >
              Lihat file
            </a>
          </div>
        </div>
        <p class="text-xs text-gray-500">Upload file baru untuk mengganti</p>
      </div>

      <!-- Default State -->
      <div v-else class="space-y-2">
        <span class="text-4xl block">📁</span>
        <p class="text-sm text-gray-600">
          Drag & drop atau <span class="text-primary-600 font-medium">pilih file</span>
        </p>
        <p class="text-xs text-gray-400">PDF, DOC, DOCX — Maks. 5 MB</p>
      </div>
    </div>

    <!-- Error -->
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUpload } from '@/composables/useUpload.js'

const props = defineProps({
  label:        { type: String, default: 'File Surat' },
  required:     { type: Boolean, default: false },
  existingFile: { type: String, default: null }
})

const emit = defineEmits(['file-selected'])

const inputRef  = ref(null)
const isDragging = ref(false)

const { file, fileError, preview, handleFileChange, clearFile: clear } = useUpload()

const error = computed(() => fileError.value)

const fileIcon = computed(() => {
  if (!preview.value) return '📄'
  if (preview.value.type === 'application/pdf') return '📕'
  return '📝'
})

function triggerInput() {
  inputRef.value?.click()
}

function handleChange(e) {
  const f = e.target.files[0]
  if (f) {
    handleFileChange(f)
    if (!fileError.value) emit('file-selected', f)
  }
}

function handleDrop(e) {
  isDragging.value = false
  const f = e.dataTransfer.files[0]
  if (f) {
    handleFileChange(f)
    if (!fileError.value) emit('file-selected', f)
  }
}

function clearFile() {
  clear()
  if (inputRef.value) inputRef.value.value = ''
  emit('file-selected', null)
}

defineExpose({ file })
</script>