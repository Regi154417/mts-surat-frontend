<template>
  <div class="overflow-hidden rounded-xl border border-gray-200">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">No</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nomor Surat</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Jenis</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Perihal</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Pihak</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Tgl. Surat</th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-if="!data.length">
            <td colspan="7" class="px-4 py-16 text-center text-gray-400">
              <span class="block text-3xl mb-2">📊</span>
              Generate laporan terlebih dahulu
            </td>
          </tr>
          <tr
            v-else
            v-for="(row, i) in data"
            :key="i"
            class="hover:bg-gray-50"
          >
            <td class="px-4 py-3 text-gray-400">{{ i + 1 }}</td>
            <td class="px-4 py-3 font-medium text-gray-900">{{ row.nomor_surat }}</td>
            <td class="px-4 py-3">
              <span :class="row.jenis === 'Surat Masuk' ? 'text-blue-600' : 'text-purple-600'"
                    class="text-xs font-medium">
                {{ row.jenis }}
              </span>
            </td>
            <td class="px-4 py-3 text-gray-600 max-w-48 truncate">{{ row.perihal }}</td>
            <td class="px-4 py-3 text-gray-600">{{ row.pihak }}</td>
            <td class="px-4 py-3 text-gray-500">{{ formatDateShort(row.tanggal_surat) }}</td>
            <td class="px-4 py-3">
              <AppBadge
                :value="row.status"
                :type="row.jenis === 'Surat Masuk' ? 'disposisi' : 'persetujuan'"
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
  data: { type: Array, default: () => [] }
})
</script>