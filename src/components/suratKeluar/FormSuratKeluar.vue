<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <!-- Nomor Surat -->
    <div>
      <label class="label-field">Nomor Surat <span class="text-red-500">*</span></label>
      <input v-model="form.nomor_surat" type="text" class="input-field"
             placeholder="Contoh: SK/001/MTs-AM/I/2025" required />
    </div>

    <!-- Tanggal Surat -->
    <div>
      <label class="label-field">Tanggal Surat <span class="text-red-500">*</span></label>
      <input v-model="form.tanggal_surat" type="date" class="input-field" required />
    </div>

    <!-- Tujuan -->
    <div>
      <label class="label-field">Tujuan <span class="text-red-500">*</span></label>
      <input v-model="form.tujuan" type="text" class="input-field"
             placeholder="Nama instansi / individu tujuan" required />
    </div>

    <!-- Perihal -->
    <div>
      <label class="label-field">Perihal <span class="text-red-500">*</span></label>
      <textarea v-model="form.perihal" class="input-field resize-none" rows="3"
                placeholder="Isi perihal surat..." required />
    </div>

    <!-- Upload File -->
    <AppFileUpload
      label="File Surat"
      :existing-file="editData?.file_path"
      @file-selected="handleFile"
    />

    <!-- Info Persetujuan -->
    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
      <span class="text-xl">⚠️</span>
      <p class="text-sm text-yellow-700">
        Surat keluar yang ditambahkan akan otomatis masuk ke antrian persetujuan kepala sekolah.
      </p>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3 pt-2">
      <AppButton type="button" variant="secondary" @click="$emit('cancel')">
        Batal
      </AppButton>
      <AppButton type="submit" :loading="loading">
        {{ editData ? 'Simpan Perubahan' : 'Tambah Surat Keluar' }}
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
  nomor_surat:   '',
  tanggal_surat: '',
  tujuan:        '',
  perihal:       ''
})

const selectedFile = ref(null)

watch(() => props.editData, (val) => {
  if (val) {
    form.value = {
      nomor_surat:   val.nomor_surat || '',
      tanggal_surat: toInputDate(val.tanggal_surat),
      tujuan:        val.tujuan || '',
      perihal:       val.perihal || ''
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