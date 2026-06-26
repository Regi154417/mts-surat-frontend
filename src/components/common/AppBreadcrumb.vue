<template>
  <nav v-if="crumbs.length" class="flex items-center gap-2 text-sm">
    <span class="text-gray-400">📍</span>
    <template v-for="(crumb, i) in crumbs" :key="i">
      <span
        :class="i === crumbs.length - 1
          ? 'font-medium text-primary-600'
          : 'text-gray-500 hover:text-gray-700 cursor-pointer'"
      >
        {{ crumb }}
      </span>
      <span v-if="i < crumbs.length - 1" class="text-gray-300">/</span>
    </template>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const crumbs = computed(() => {
  const bc = route.meta?.breadcrumb
  if (!bc) return []
  return Array.isArray(bc) ? bc : [bc]
})
</script>