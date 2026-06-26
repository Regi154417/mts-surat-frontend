<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between
                 sticky top-0 z-20 shadow-sm">
    <!-- Left: Hamburger + Judul halaman -->
    <div class="flex items-center gap-4">
      <button
        @click="$emit('toggle-sidebar')"
        class="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <div>
        <h2 class="font-semibold text-gray-900 text-base">{{ pageTitle }}</h2>
        <p class="text-gray-400 text-xs">{{ formattedDate }}</p>
      </div>
    </div>

    <!-- Right: Notifikasi + User Menu -->
    <div class="flex items-center gap-3">
      <!-- Tanggal -->
      <span class="hidden md:block text-sm text-gray-500">
        Halo, <span class="font-medium text-gray-700">{{ userName }}</span>
      </span>

      <!-- Logout -->
      <button
        @click="handleLogout"
        class="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50
               rounded-lg transition-colors border border-red-200"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
        </svg>
        <span class="hidden md:block">Keluar</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'
import { formatDate } from '@/utils/formatDate.js'

defineEmits(['toggle-sidebar'])

const route  = useRoute()
const { userName, logout } = useAuth()

const pageTitle    = computed(() => route.meta?.title || 'Dashboard')
const formattedDate = computed(() => formatDate(new Date()))

function handleLogout() {
  if (confirm('Yakin ingin keluar?')) {
    logout()
  }
}
</script>