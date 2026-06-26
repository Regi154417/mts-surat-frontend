import { ref, computed } from 'vue'

export function usePagination(defaultLimit = 10) {
  const page  = ref(1)
  const limit = ref(defaultLimit)
  const total = ref(0)

  const totalPages  = computed(() => Math.ceil(total.value / limit.value))
  const hasPrev     = computed(() => page.value > 1)
  const hasNext     = computed(() => page.value < totalPages.value)
  const startIndex  = computed(() => (page.value - 1) * limit.value + 1)
  const endIndex    = computed(() => Math.min(page.value * limit.value, total.value))

  function setPage(p) {
    if (p >= 1 && p <= totalPages.value) {
      page.value = p
    }
  }

  function prevPage() {
    if (hasPrev.value) page.value--
  }

  function nextPage() {
    if (hasNext.value) page.value++
  }

  function setTotal(t) {
    total.value = t
  }

  function reset() {
    page.value = 1
  }

  return {
    page, limit, total, totalPages,
    hasPrev, hasNext, startIndex, endIndex,
    setPage, prevPage, nextPage, setTotal, reset
  }
}