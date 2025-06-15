import { ref, watch, onMounted } from 'vue'

const theme = ref('light')

export function useTheme() {
  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    updateDocumentClass()
  }

  const toggleTheme = () => {
    setTheme(theme.value === 'light' ? 'dark' : 'light')
  }

  const updateDocumentClass = () => {
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme.value)
  }

  const initTheme = () => {
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme')
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    
    theme.value = savedTheme || systemTheme
    updateDocumentClass()
  }

  // Watch for theme changes
  watch(theme, updateDocumentClass)

  // Initialize theme on mount
  onMounted(() => {
    initTheme()
  })

  return {
    theme,
    setTheme,
    toggleTheme,
    initTheme
  }
} 