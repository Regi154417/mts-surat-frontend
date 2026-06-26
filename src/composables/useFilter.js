import { ref, watch } from 'vue'

export function useFilter(defaultFilters = {}) {
  const filters = ref({ ...defaultFilters })
  const search  = ref('')

  function setFilter(key, value) {
    filters.value[key] = value
  }

  function resetFilters() {
    Object.keys(defaultFilters).forEach(key => {
      filters.value[key] = defaultFilters[key]
    })
    search.value = ''
  }

  function getParams() {
    const params = { ...filters.value }
    if (search.value) {
      params.search = search.value
    }
    // Hapus key yang nilainya kosong/null/undefined
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key]
      }
    })
    return params
  }

  return { filters, search, setFilter, resetFilters, getParams }
}