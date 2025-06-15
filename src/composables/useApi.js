import axios from 'axios'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { 
  mockProjects, 
  mockSkills, 
  mockEducation, 
  mockStats, 
  mockRecentMessages 
} from '../data/mockData.js'

// Check if we should use mock data
const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true'

console.log('Environment variables:', {
  VITE_USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA,
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  useMockData: useMockData
});

console.log('API Configuration:', {
  'Using Mock Data': useMockData,
  'API Base URL': import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
});

// Set up axios defaults
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      // Redirect to login
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// Mock API functions for development
const mockApi = {
  get: async (url) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300))
    
    switch (url) {
      case '/projects':
        return { data: mockProjects }
      case '/skills':
        return { data: mockSkills }
      case '/education':
        return { data: mockEducation }
      case '/admin/dashboard/stats':
        return { data: mockStats }
      case '/admin/dashboard/recent-messages':
        return { data: mockRecentMessages }
      case '/admin/messages':
        return { data: [] }
      case '/admin/skills':
        return { data: [] }
      case '/admin/education':
        return { data: [] }
      case '/admin/projects':
        return { data: [] }
      default:
        throw new Error(`Mock endpoint not found: ${url}`)
    }
  },
  post: async (url, data) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    switch (url) {
      case '/contact':
        console.log('Mock contact form submission:', data)
        return { data: { message: 'Message sent successfully!' } }
      case '/login':
        // Mock login
        if (data.email === 'admin@example.com' && data.password === 'password') {
          const mockUser = { id: 1, name: 'Admin User', email: 'admin@example.com', is_admin: true }
          const mockToken = 'mock-jwt-token'
          return { data: { user: mockUser, token: mockToken } }
        } else {
          throw new Error('Invalid credentials')
        }
      default:
        return { data: { message: 'Success' } }
    }
  },
  put: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: { message: 'Updated successfully' } }
  },
  delete: async (url) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return { data: { message: 'Deleted successfully' } }
  }
}

export function useApi() {
  return useMockData ? mockApi : api
}

export function useForm(initialData = {}) {
  const router = useRouter()
  
  const form = reactive({
    ...initialData,
    processing: false,
    errors: {},
    hasErrors: false,
    recentlySuccessful: false,
    wasSuccessful: false
  })

  const clearErrors = () => {
    form.errors = {}
    form.hasErrors = false
  }

  const setError = (field, message) => {
    form.errors[field] = message
    form.hasErrors = true
  }

  const setErrors = (errors) => {
    form.errors = errors
    form.hasErrors = Object.keys(errors).length > 0
  }

  const reset = (...fields) => {
    if (fields.length === 0) {
      Object.keys(initialData).forEach(key => {
        form[key] = initialData[key]
      })
    } else {
      fields.forEach(field => {
        if (initialData.hasOwnProperty(field)) {
          form[field] = initialData[field]
        }
      })
    }
    clearErrors()
  }

  const post = async (url, options = {}) => {
    form.processing = true
    form.wasSuccessful = false
    form.recentlySuccessful = false
    clearErrors()

    try {
      const data = { ...form }
      delete data.processing
      delete data.errors
      delete data.hasErrors
      delete data.recentlySuccessful
      delete data.wasSuccessful

      const response = await api.post(url, data)
      
      form.processing = false
      form.wasSuccessful = true
      form.recentlySuccessful = true

      // Reset recentlySuccessful after a delay
      setTimeout(() => {
        form.recentlySuccessful = false
      }, 2000)

      if (options.onSuccess) {
        options.onSuccess(response.data)
      }

      if (options.redirectTo) {
        router.push(options.redirectTo)
      }

      return response.data
    } catch (error) {
      form.processing = false
      
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors)
      } else if (error.response?.data?.message) {
        setError('general', error.response.data.message)
      } else {
        setError('general', 'An error occurred. Please try again.')
      }

      if (options.onError) {
        options.onError(error)
      }

      throw error
    }
  }

  const put = async (url, options = {}) => {
    return post(url, { ...options, method: 'PUT' })
  }

  const patch = async (url, options = {}) => {
    return post(url, { ...options, method: 'PATCH' })
  }

  const delete_ = async (url, options = {}) => {
    form.processing = true
    clearErrors()

    try {
      const response = await api.delete(url)
      form.processing = false

      if (options.onSuccess) {
        options.onSuccess(response.data)
      }

      if (options.redirectTo) {
        router.push(options.redirectTo)
      }

      return response.data
    } catch (error) {
      form.processing = false
      
      if (options.onError) {
        options.onError(error)
      }

      throw error
    }
  }

  return {
    ...form,
    post,
    put,
    patch,
    delete: delete_,
    reset,
    clearErrors,
    setError,
    setErrors
  }
}

export default api

// Portfolio Data Composable (fallback for offline or development)
export function usePortfolio() {
  const api = useApi()
  const portfolioData = reactive({
    profile: null,
    projects: [],
    featuredProjects: [],
    skills: [],
    education: [],
    experience: [],
  })

  const loadPortfolioData = async () => {
    try {
      // Load all data in parallel
      const [profile, projects, skills, education, experience] = await Promise.all([
        api.getProfile().catch(() => null),
        api.getProjects().catch(() => []),
        api.getSkills().catch(() => []),
        api.getEducation().catch(() => []),
        api.getExperience().catch(() => []),
      ])

      portfolioData.profile = profile
      portfolioData.projects = projects
      portfolioData.featuredProjects = projects.filter(p => p.featured)
      portfolioData.skills = skills
      portfolioData.education = education
      portfolioData.experience = experience

    } catch (error) {
      console.error('Error loading portfolio data:', error)
    }
  }

  const submitContactForm = async (formData) => {
    return await api.sendMessage(formData)
  }

  return {
    portfolioData,
    loading: api.loading,
    error: api.error,
    loadPortfolioData,
    submitContactForm,
  }
} 