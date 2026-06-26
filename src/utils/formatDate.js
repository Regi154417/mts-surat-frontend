import dayjs from 'dayjs'
import 'dayjs/locale/id'

dayjs.locale('id')

/**
 * Format tanggal ke bahasa Indonesia
 * @param {string|Date} date
 * @param {string} format - default: 'DD MMMM YYYY'
 * @returns {string}
 */
export const formatDate = (date, format = 'DD MMMM YYYY') => {
  if (!date) return '-'
  return dayjs(date).format(format)
}

/**
 * Format tanggal singkat
 * @param {string|Date} date
 * @returns {string} contoh: 01/01/2025
 */
export const formatDateShort = (date) => {
  if (!date) return '-'
  return dayjs(date).format('DD/MM/YYYY')
}

/**
 * Format tanggal dengan waktu
 * @param {string|Date} date
 * @returns {string} contoh: 01 Januari 2025, 08:00
 */
export const formatDateTime = (date) => {
  if (!date) return '-'
  return dayjs(date).format('DD MMMM YYYY, HH:mm')
}

/**
 * Format tanggal relatif (berapa lama yang lalu)
 * @param {string|Date} date
 * @returns {string}
 */
export const formatRelative = (date) => {
  if (!date) return '-'
  const now = dayjs()
  const target = dayjs(date)
  const diffDays = now.diff(target, 'day')

  if (diffDays === 0) return 'Hari ini'
  if (diffDays === 1) return 'Kemarin'
  if (diffDays < 7) return `${diffDays} hari yang lalu`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`
  return target.format('DD MMMM YYYY')
}

/**
 * Format tanggal ke format input date HTML (YYYY-MM-DD)
 * @param {string|Date} date
 * @returns {string}
 */
export const toInputDate = (date) => {
  if (!date) return ''
  return dayjs(date).format('YYYY-MM-DD')
}