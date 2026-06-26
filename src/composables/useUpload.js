import { ref } from 'vue'

const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

export function useUpload() {
  const file      = ref(null)
  const fileError = ref('')
  const preview   = ref(null)

  function validateFile(f) {
    fileError.value = ''

    if (!ALLOWED_TYPES.includes(f.type)) {
      fileError.value = 'Hanya file PDF, DOC, atau DOCX yang diizinkan.'
      return false
    }

    if (f.size > MAX_SIZE) {
      fileError.value = 'Ukuran file maksimal 5 MB.'
      return false
    }

    return true
  }

  function handleFileChange(f) {
    if (!f) {
      file.value  = null
      preview.value = null
      return
    }

    if (validateFile(f)) {
      file.value    = f
      preview.value = {
        name: f.name,
        size: (f.size / 1024).toFixed(1) + ' KB',
        type: f.type
      }
    } else {
      file.value    = null
      preview.value = null
    }
  }

  function clearFile() {
    file.value    = null
    preview.value = null
    fileError.value = ''
  }

  function appendToFormData(fd, fieldName = 'file') {
    if (file.value) {
      fd.append(fieldName, file.value)
    }
  }

  return { file, fileError, preview, handleFileChange, clearFile, appendToFormData }
}