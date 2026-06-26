<template>
  <div class="overflow-hidden rounded-xl border border-gray-200">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <!-- Head -->
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            <th
              v-for="col in columns"
              :key="col.key"
              :class="[
                'px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                col.class || ''
              ]"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="bg-white divide-y divide-gray-100">
          <!-- Loading Skeleton -->
          <template v-if="loading">
            <tr v-for="i in 5" :key="i">
              <td
                v-for="col in columns"
                :key="col.key"
                class="px-4 py-3"
              >
                <div class="h-4 bg-gray-200 rounded animate-pulse" />
              </td>
            </tr>
          </template>

          <!-- Empty State -->
          <tr v-else-if="!data.length">
            <td :colspan="columns.length" class="px-4 py-16 text-center">
              <div class="flex flex-col items-center gap-3">
                <span class="text-4xl">📭</span>
                <p class="text-gray-500">{{ emptyText }}</p>
              </div>
            </td>
          </tr>

          <!-- Data Rows -->
          <template v-else>
            <tr
              v-for="(row, index) in data"
              :key="row.id || index"
              class="hover:bg-gray-50 transition-colors"
            >
              <td
                v-for="col in columns"
                :key="col.key"
                :class="['px-4 py-3 text-gray-700', col.cellClass || '']"
              >
                <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
                  {{ row[col.key] ?? '-' }}
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  columns:   { type: Array, required: true },
  data:      { type: Array, default: () => [] },
  loading:   { type: Boolean, default: false },
  emptyText: { type: String, default: 'Tidak ada data.' }
})
</script>