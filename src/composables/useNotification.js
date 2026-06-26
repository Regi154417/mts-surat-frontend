import { ref } from 'vue'

const notifications = ref([])
let idCounter = 0

export function useNotification() {
  function show({ type = 'info', message, duration = 3000 }) {
    const id = ++idCounter
    notifications.value.push({ id, type, message })

    setTimeout(() => {
      remove(id)
    }, duration)
  }

  function remove(id) {
    const idx = notifications.value.findIndex(n => n.id === id)
    if (idx !== -1) notifications.value.splice(idx, 1)
  }

  function success(message) {
    show({ type: 'success', message })
  }

  function error(message) {
    show({ type: 'error', message, duration: 5000 })
  }

  function warning(message) {
    show({ type: 'warning', message })
  }

  function info(message) {
    show({ type: 'info', message })
  }

  return { notifications, show, remove, success, error, warning, info }
}