<template>
  <div class="bg-white rounded-xl border border-gray-100 shadow-sm">
    <div class="px-6 py-4 border-b border-gray-100">
      <h3 class="font-semibold text-gray-900">Aktivitas Terbaru</h3>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nomor Surat</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Perihal</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Jenis</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tanggal</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <!-- Loading -->
          <tr v-if="loading" v-for="i in 5" :key="i">
            <td v-for="j in 5" :key="j" class="px-6 py-3">
              <div class="h-4 bg-gray-200 rounded animate-pulse" />
            </td>
          </tr>

          <!-- Empty -->
          <tr v-else-if="!items.length">
            <td colspan="5" class="px-6 py-12 text-center text-gray-400">
              <span class="block text-3xl mb-2">📭</span>
              Belum ada aktivitas
            </td>
          </tr>

          <!-- Data -->
          <tr
            v-else
            v-for="item in items"
            :key="item.id + item.jenis"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-3 font-medium text-gray-900">{{ item.nomor_surat }}</td>
            <td class="px-6 py-3 text-gray-600 max-w-48 truncate">{{ item.perihal }}</td>
            <td class="px-6 py-3">
              <AppBadge :value="item.jenis" type="jenis" />
            </td>
            <td class="px-6 py-3 text-gray-500">{{ formatDateShort(item.tanggal_surat) }}</td>
            <td class="px-6 py-3">
              <AppBadge
                :value="item.status"
                :type="item.jenis === 'masuk' ? 'disposisi' : 'persetujuan'"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import AppBadge from '@/components/common/AppBadge.vue'
import { formatDateShort } from '@/utils/formatDate.js'

defineProps({
  items:   { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})
</script>