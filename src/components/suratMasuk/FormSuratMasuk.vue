<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <!-- Nomor Surat -->
    <div>
      <label class="label-field">Nomor Surat <span class="text-red-500">*</span></label>
      <input v-model="form.nomor_surat" type="text" class="input-field"
             placeholder="Contoh: SM/001/MTs-AM/I/2025" required />
    </div>

    <!-- Tanggal Surat -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="label-field">Tanggal Surat <span class="text-red-500">*</span></label>
        <input v-model="form.tanggal_surat" type="date" class="input-field" required />
      </div>
      <div>
        <label class="label-field">Tanggal Terima <span class="text-red-500">*</span></label>
        <input v-model="form.tanggal_terima" type="date" class="input-field" required />
      </div>
    </div>

    <!-- Pengirim -->
    <div>
      <label class="label-field">Pengirim <span class="text-red-500">*</span></label>
      <input v-model="form.pengirim" type="text" class="input-field"
             placeholder="Nama instansi / individu pengirim" required />
    </div>

    <!-- Perihal -->
    <div>
      <label class="label-field">Perihal <span class="text-red-500">*</span></label>
      <textarea v-model="form.perihal" class="input-field resize-none" rows="3"
                placeholder="Isi perihal surat..." required />
    </div>

    <!-- Upload File -->
    <AppFileUpload
      label="File Lampiran"
      :existing-file="editData?.file_path"
      @file-selected="handleFile"
    />

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3 pt-2">
      <AppButton type="button" variant="secondary" @click="$emit('cancel')">
        Batal
      </AppButton>
      <AppButton type="submit" :loading="loading">
        {{ editData ? 'Simpan Perubahan' : 'Tambah Surat Masuk' }}
      </AppButton>
    </div>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'
import { toInputDate } from '@/utils/formatDate.js'
import AppButton    from '@/components/common/AppButton.vue'
import AppFileUpload from '@/components/common/AppFileUpload.vue'

const props = defineProps({
  editData: { type: Object, default: null },
  loading:  { type: Boolean, default: false }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({
  nomor_surat:    '',
  tanggal_surat:  '',
  tanggal_terima: '',
  pengirim:       '',
  perihal:        ''
})

const selectedFile = ref(null)

// Isi form jika mode edit
watch(() => props.editData, (val) => {
  if (val) {
    form.value = {
      nomor_surat:    val.nomor_surat || '',
      tanggal_surat:  toInputDate(val.tanggal_surat),
      tanggal_terima: toInputDate(val.tanggal_terima),
      pengirim:       val.pengirim || '',
      perihal:        val.perihal || ''
    }
  }
}, { immediate: true })

function handleFile(file) {
  selectedFile.value = file
}

function handleSubmit() {
  const fd = new FormData()
  Object.entries(form.value).forEach(([k, v]) => fd.append(k, v))
  if (selectedFile.value) fd.append('file', selectedFile.value)
  emit('submit', fd)
}
</script>