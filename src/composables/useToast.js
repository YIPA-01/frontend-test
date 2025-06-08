import { ref, computed } from 'vue'

const toasts = ref([])
let toastId = 0

export function useToast() {
  const addToast = (toast) => {
    const id = ++toastId
    const newToast = {
      id,
      ...toast,
      timestamp: Date.now()
    }
    toasts.value.push(newToast)
    
    // Auto-remove toast after duration (default 5 seconds)
    const duration = toast.duration || 5000
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
    
    return id
  }

  const removeToast = (id) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }

  const clearToasts = () => {
    toasts.value = []
  }

  // Convenience methods
  const toast = (message, type = 'default', options = {}) => {
    return addToast({
      title: message,
      type,
      ...options
    })
  }

  const success = (message, options = {}) => {
    return toast(message, 'success', options)
  }

  const error = (message, options = {}) => {
    return toast(message, 'error', options)
  }

  const warning = (message, options = {}) => {
    return toast(message, 'warning', options)
  }

  const info = (message, options = {}) => {
    return toast(message, 'info', options)
  }

  // Aliases for compatibility
  const showSuccess = success
  const showError = error
  const showWarning = warning
  const showInfo = info

  return {
    toasts: computed(() => toasts.value),
    messages: computed(() => toasts.value.map(toast => ({
      id: toast.id,
      message: toast.title,
      type: toast.type
    }))),
    addToast,
    removeToast,
    clearToasts,
    toast,
    success,
    error,
    warning,
    info,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
} 