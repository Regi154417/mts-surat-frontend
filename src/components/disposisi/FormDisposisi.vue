<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <!-- Info Surat -->
    <div v-if="suratData" class="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-1">
      <p class="text-xs text-blue-500 font-semibold uppercase">Surat Terpilih</p>
      <p class="text-sm font-medium text-blue-900">{{ suratData.nomor_surat }}</p>
      <p class="text-sm text-blue-700">{{ suratData.perihal }}</p>
      <p class="text-xs text-blue-500">Dari: {{ suratData.pengirim }}</p>
    </div>

    <!-- Arahan -->
    <div>
      <label class="label-field">Arahan / Instruksi</label>
      <textarea
        v-model="form.arahan"
        class="input-field resize-none"
        rows="4"
        placeholder="Tulis arahan atau instruksi untuk kepala sekolah... (opsional)"
      />
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3 pt-2">
      <AppButton type="button" variant="secondary" @click="$emit('cancel')">
        Batal
      </AppButton>
      <AppButton type="submit" :loading="loading">
        📋 Kirim Disposisi
      </AppButton>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from '@/components/common/AppButton.vue'

const props = defineProps({
  suratData: { type: Object, default: null },
  loading:   { type: Boolean, default: false }
})

const emit = defineEmits(['submit', 'cancel'])

const form = ref({ arahan: '' })

function handleSubmit() {
  emit('submit', {
    surat_masuk_id: props.suratData?.id,
    arahan: form.value.arahan
  })
}
</script>