<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-700 via-primary-600 to-primary-500
              flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo & Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl
                    shadow-lg mb-4">
          <img src="/logo.png" alt="MTs Al-Muttaqin" class="w-14 h-14 object-contain"
               @error="showFallback = true" v-if="!showFallback" />
          <span v-else class="text-2xl font-bold text-primary-700">MTs</span>
        </div>
        <h1 class="text-2xl font-bold text-white">MTs Al-Muttaqin</h1>
        <p class="text-primary-100 text-sm mt-1">Sistem Administrasi Surat</p>
      </div>

      <!-- Card konten -->
      <div class="bg-white rounded-2xl shadow-2xl p-8">
        <router-view />
      </div>

      <p class="text-center text-primary-200 text-xs mt-6">
        &copy; {{ year }} MTs Al-Muttaqin. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showFallback = ref(false)
const year = new Date().getFullYear()
</script>