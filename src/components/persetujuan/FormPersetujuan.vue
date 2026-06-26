<template>
  <form @submit.prevent="handleSubmit" class="space-y-5">
    <!-- Info Surat Keluar -->
    <div v-if="suratData" class="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-1">
      <p class="text-xs text-gray-400 font-semibold uppercase">Surat Keluar</p>
      <p class="text-sm font-medium text-gray-900">{{ suratData.nomor_surat }}</p>
      <p class="text-sm text-gray-600">{{ suratData.perihal }}</p>
      <p class="text-xs text-gray-400">Tujuan: {{ suratData.tujuan }}</p>
    </div>

    <!-- Keputusan -->
    <div>
      <label class="label-field">Keputusan <span class="text-red-500">*</span></label>
      <div class="flex gap-4 mt-2">
        <label
          class="flex-1 flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors"
          :class="form.status === 'disetujui' ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300'"
        >
          <input type="radio" v-model="form.status" value="disetujui" class="hidden" />
          <span class="text-2xl">✅</span>
          <div>
            <p class="font-medium text-gray-800">Setujui</p>
            <p class="text-xs text-gray-500">Surat keluar diizinkan</p>
          </div>
        </label>

        <label
          class="flex-1 flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-colors"
          :class="form.status === 'ditolak' ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:border-gray-300'"
        >
          <input type="radio" v-model="form.status" value="ditolak" class="hidden" />
          <span class="text-2xl">❌</span>
          <div>
            <p class="font-medium text-gray-800">Tolak</p>
            <p class="text-xs text-gray-500">Surat keluar ditolak</p>
          </div>
        </label>
      </div>
    </div>

    <!-- Catatan -->
    <div>
      <label class="label-field">
        Catatan
        <span v-if="form.status === 'ditolak'" class="text-red-500">*</span>
        <span v-else class="text-gray-400 font-normal">(opsional)</span>
      </label>
      <textarea
        v-model="form.catatan"
        class="input-field resize-none"
        rows="3"
        placeholder="Tambahkan catatan atau alasan keputusan..."
        :required="form.status === 'ditolak'"
      />
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3 pt-2">
      <AppButton type="button" variant="secondary" @click="$emit('cancel')">
        Batal
      </AppButton>
      <AppButton
        type="submit"
        :variant="form.status === 'ditolak' ? 'danger' : 'success'"
        :loading="loading"
        :disabled="!form.status"
      >
        {{ form.status === 'disetujui' ? '✅ Setujui Surat' : form.status === 'ditolak' ? '❌ Tolak Surat' : 'Pilih Keputusan' }}
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

const form = ref({ status: '', catatan: '' })

function handleSubmit() {
  if (!form.value.status) return
  emit('submit', {
    surat_keluar_id: props.suratData?.surat_keluar_id || props.suratData?.id,
    status:  form.value.status,
    catatan: form.value.catatan
  })
}
</script>