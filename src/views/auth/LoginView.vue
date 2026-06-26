<template>
  <div>
    <div class="text-center mb-6">
      <h2 class="text-xl font-bold text-gray-900">Masuk ke Sistem</h2>
      <p class="text-gray-500 text-sm mt-1">Silakan login dengan akun Anda</p>
    </div>

    <form @submit.prevent="handleLogin" class="space-y-4">
      <!-- Username -->
      <div>
        <label class="label-field">Username</label>
        <input
          v-model="form.username"
          type="text"
          class="input-field"
          placeholder="Masukkan username"
          autocomplete="username"
          required
        />
      </div>

      <!-- Password -->
      <div>
        <label class="label-field">Password</label>
        <div class="relative">
          <input
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            class="input-field pr-10"
            placeholder="Masukkan password"
            autocomplete="current-password"
            required
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {{ showPassword ? '🙈' : '👁️' }}
          </button>
        </div>
      </div>

      <!-- Error -->
      <div v-if="errorMsg" class="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm flex items-start gap-2">
        <span>⚠️</span>
        <p>{{ errorMsg }}</p>
      </div>

      <!-- Submit -->
      <AppButton type="submit" class="w-full" :loading="loading" size="lg">
        🔐 Masuk
      </AppButton>
    </form>

    <p class="text-center text-xs text-gray-400 mt-6">
      Hubungi administrator jika mengalami masalah login.
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import AppButton from '@/components/common/AppButton.vue'

const authStore    = useAuthStore()
const loading      = ref(false)
const showPassword = ref(false)
const errorMsg     = ref('')

const form = ref({
  username: '',
  password: ''
})

async function handleLogin() {
  loading.value  = true
  errorMsg.value = ''
  try {
    await authStore.login(form.value)
  } catch (err) {
    errorMsg.value = err.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>