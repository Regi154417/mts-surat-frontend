import dayjs from 'dayjs'

/**
 * Generate nomor surat masuk otomatis
 * Format: SM/001/MTs-AM/I/2025
 * @param {number} urut - nomor urut
 * @returns {string}
 */
export const generateNomorMasuk = (urut = 1) => {
  const bulanRomawi = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']
  const bulan = bulanRomawi[dayjs().month()]
  const tahun = dayjs().year()
  const nomor = String(urut).padStart(3, '0')
  return `SM/${nomor}/MTs-AM/${bulan}/${tahun}`
}

/**
 * Generate nomor surat keluar otomatis
 * Format: SK/001/MTs-AM/I/2025
 * @param {number} urut - nomor urut
 * @returns {string}
 */
export const generateNomorKeluar = (urut = 1) => {
  const bulanRomawi = ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII']
  const bulan = bulanRomawi[dayjs().month()]
  const tahun = dayjs().year()
  const nomor = String(urut).padStart(3, '0')
  return `SK/${nomor}/MTs-AM/${bulan}/${tahun}`
}