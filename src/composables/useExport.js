import { ref } from 'vue'
import { formatDate } from '@/utils/formatDate.js'

export function useExport() {
  const exporting = ref(false)

  /**
   * Export data ke CSV
   */
  function exportCSV(data, filename = 'laporan') {
    if (!data.length) return

    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(','),
      ...data.map(row =>
        headers.map(h => {
          const val = row[h] ?? ''
          return `"${String(val).replace(/"/g, '""')}"`
        }).join(',')
      )
    ]

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href     = url
    link.download = `${filename}_${formatDate(new Date(), 'YYYYMMDD')}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  /**
   * Export data ke JSON (untuk debugging / backup)
   */
  function exportJSON(data, filename = 'laporan') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url  = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href     = url
    link.download = `${filename}_${formatDate(new Date(), 'YYYYMMDD')}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  /**
   * Print halaman laporan
   */
  function printPage() {
    window.print()
  }

  return { exporting, exportCSV, exportJSON, printPage }
}