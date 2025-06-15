import { ref, reactive, computed, readonly } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from './useApi'

const user = ref(null)
const loading = ref(false)
const error = ref(null)

// Initialize from localStorage
const savedUser = localStorage.getItem('user')
if (savedUser) {
  try {
    user.value = JSON.parse(savedUser)
  } catch (e) {
    localStorage.removeItem('user')
  }
}

export function useAuth() {
  const router = useRouter()
  const api = useApi()

  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.is_admin === true)

  const setUser = (userData) => {
    user.value = userData
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData))
    } else {
      localStorage.removeItem('user')
    }
  }

  const setToken = (token) => {
    if (token) {
      localStorage.setItem('auth_token', token)
    } else {
      localStorage.removeItem('auth_token')
    }
  }

  const login = async (credentials) => {
    loading.value = true
    error.value = null

    try {
      console.log('Making API login request with:', credentials);
      const response = await api.post('/login', credentials)
      console.log('API response:', response);
      console.log('Response data:', response.data);
      
      setUser(response.user || response.data?.user)
      setToken(response.token || response.data?.token)
      
      console.log('User set:', user.value);
      console.log('Token set:', localStorage.getItem('auth_token'));
      
      return response.data || response
    } catch (err) {
      console.error('Login API error:', err);
      error.value = err.response?.data?.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const register = async (userData) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/register', userData)
      setUser(response.user)
      setToken(response.token)
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true

    try {
      await api.post('/logout')
    } catch (err) {
      // Ignore logout errors
    } finally {
      setUser(null)
      setToken(null)
      loading.value = false
      router.push('/login')
    }
  }

  const fetchUser = async () => {
    if (!localStorage.getItem('auth_token')) {
      return
    }

    loading.value = true

    try {
      const response = await api.get('/user')
      setUser(response.data)
    } catch (err) {
      setUser(null)
      setToken(null)
    } finally {
      loading.value = false
    }
  }

  const forgotPassword = async (email) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/forgot-password', { email })
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to send reset email'
      throw err
    } finally {
      loading.value = false
    }
  }

  const resetPassword = async (token, email, password, passwordConfirmation) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/reset-password', {
        token,
        email,
        password,
        password_confirmation: passwordConfirmation
      })
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Password reset failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const verifyEmail = async (id, hash) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get(`/email/verify/${id}/${hash}`)
      if (response.data.user) {
        setUser(response.data.user)
      }
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Email verification failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  const resendEmailVerification = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post('/email/verification-notification')
      return response.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to resend verification'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user: readonly(user),
    loading: readonly(loading),
    error: readonly(error),
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    fetchUser,
    forgotPassword,
    resetPassword,
    verifyEmail,
    resendEmailVerification,
    setUser,
    setToken
  }
}

// Global auth state
export const auth = {
  user,
  isAuthenticated: computed(() => !!user.value),
  isAdmin: computed(() => user.value?.is_admin === true)
} 