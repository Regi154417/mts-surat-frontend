<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <!-- Sidebar -->
    <AppSidebar :collapsed="sidebarCollapsed" @toggle="toggleSidebar" />

    <!-- Konten Utama -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <AppHeader @toggle-sidebar="toggleSidebar" />

      <!-- Main Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <!-- Breadcrumb -->
        <AppBreadcrumb class="mb-4" />

        <!-- Page Content -->
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>

    <!-- Toast Notification -->
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <TransitionGroup name="toast">
        <div
          v-for="notif in notifications"
          :key="notif.id"
          :class="toastClass(notif.type)"
          class="flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg min-w-72 max-w-sm"
        >
          <span class="text-lg">{{ toastIcon(notif.type) }}</span>
          <p class="text-sm flex-1">{{ notif.message }}</p>
          <button @click="remove(notif.id)" class="text-current opacity-60 hover:opacity-100">
            ✕
          </button>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar   from '@/components/common/AppSidebar.vue'
import AppHeader    from '@/components/common/AppHeader.vue'
import AppBreadcrumb from '@/components/common/AppBreadcrumb.vue'
import { useNotification } from '@/composables/useNotification.js'

const { notifications, remove } = useNotification()
const sidebarCollapsed = ref(false)

function toggleSidebar() {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

function toastClass(type) {
  const map = {
    success: 'bg-green-600 text-white',
    error:   'bg-red-600 text-white',
    warning: 'bg-yellow-500 text-white',
    info:    'bg-blue-600 text-white'
  }
  return map[type] || map.info
}

function toastIcon(type) {
  const map = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' }
  return map[type] || 'ℹ️'
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to       { opacity: 0; }

.toast-enter-active { transition: all 0.3s ease; }
.toast-leave-active { transition: all 0.3s ease; }
.toast-enter-from   { opacity: 0; transform: translateX(100%); }
.toast-leave-to     { opacity: 0; transform: translateX(100%); }
</style>