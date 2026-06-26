<template>
  <aside
    :class="[
      'bg-primary-800 text-white flex flex-col transition-all duration-300 ease-in-out',
      collapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- Logo -->
    <div class="flex items-center gap-3 px-4 py-5 border-b border-primary-700 min-h-16">
      <div class="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
        <span class="text-primary-700 font-bold text-xs">MTs</span>
      </div>
      <div v-if="!collapsed" class="overflow-hidden">
        <p class="font-semibold text-sm truncate leading-tight">MTs Al-Muttaqin</p>
        <p class="text-primary-300 text-xs">Sistem Surat</p>
      </div>
    </div>

    <!-- Toggle Button -->
    <button
      @click="$emit('toggle')"
      class="absolute -right-3 top-16 w-6 h-6 bg-primary-600 rounded-full border-2
             border-white flex items-center justify-center hover:bg-primary-500 z-10"
    >
      <span class="text-white text-xs">{{ collapsed ? '›' : '‹' }}</span>
    </button>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4 px-2">
      <div
        v-for="group in menuGroups"
        :key="group.label"
        class="mb-4"
      >
        <p
          v-if="!collapsed && group.label"
          class="text-primary-400 text-xs font-semibold uppercase tracking-wider px-3 mb-2"
        >
          {{ group.label }}
        </p>

        <router-link
          v-for="item in group.items"
          :key="item.name"
          :to="{ name: item.name }"
          :class="[
            'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 mb-1',
            isActive(item.name)
              ? 'bg-primary-600 text-white'
              : 'text-primary-200 hover:bg-primary-700 hover:text-white'
          ]"
          :title="collapsed ? item.label : ''"
        >
          <span class="text-lg flex-shrink-0">{{ item.icon }}</span>
          <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
        </router-link>
      </div>
    </nav>

    <!-- User Info -->
    <div class="border-t border-primary-700 p-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
          <span class="text-xs font-semibold">{{ initials }}</span>
        </div>
        <div v-if="!collapsed" class="overflow-hidden">
          <p class="text-sm font-medium truncate">{{ userName }}</p>
          <p class="text-primary-300 text-xs capitalize">{{ roleLabel }}</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth.js'

const props = defineProps({
  collapsed: { type: Boolean, default: false }
})

defineEmits(['toggle'])

const route   = useRoute()
const { userName, isAdmin, isKepsek } = useAuth()

const initials = computed(() =>
  userName.value
    ? userName.value.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U'
)

const roleLabel = computed(() => {
  if (isAdmin.value) return 'Administrator'
  if (isKepsek.value) return 'Kepala Sekolah'
  return ''
})

const adminMenu = [
  {
    label: 'Utama',
    items: [
      { name: 'admin.dashboard',    icon: '🏠', label: 'Dashboard' },
      { name: 'admin.surat-masuk',  icon: '📥', label: 'Surat Masuk' },
      { name: 'admin.surat-keluar', icon: '📤', label: 'Surat Keluar' },
      { name: 'admin.disposisi',    icon: '📋', label: 'Disposisi' }
    ]
  },
  {
    label: 'Lainnya',
    items: [
      { name: 'admin.arsip',   icon: '🗄️', label: 'Arsip Digital' },
      { name: 'admin.laporan', icon: '📊', label: 'Laporan' }
    ]
  }
]

const kepsekMenu = [
  {
    label: 'Utama',
    items: [
      { name: 'kepsek.dashboard',    icon: '🏠', label: 'Dashboard' },
      { name: 'kepsek.surat-masuk',  icon: '📥', label: 'Surat Masuk' },
      { name: 'kepsek.surat-keluar', icon: '📤', label: 'Surat Keluar' },
      { name: 'kepsek.disposisi',    icon: '📋', label: 'Disposisi' }
    ]
  }
]

const menuGroups = computed(() => isAdmin.value ? adminMenu : kepsekMenu)

function isActive(name) {
  return route.name === name
}
</script>