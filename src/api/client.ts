import axios from 'axios'
import { store } from '../store/store'
import { logout } from '../features/auth/authSlice' // Import your logout action

export const client = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
})

// 1. Request Interceptor (Your existing code)
client.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 2. Response Interceptor (The error checker)
client.interceptors.response.use(
  (response) => {
    // If the request succeeds, just return the response
    return response
  },
  (error) => {
    // This block runs for any status code outside the 2xx range
    
    if (error.response) {
      // The server responded with a status code (400, 401, 403, 500, etc.)
      const status = error.response.status
      const message = error.response.data?.message || 'A server error occurred'

      switch (status) {
        case 401:
          // Unauthorized: Token expired or invalid
          // Automatically log the user out
          store.dispatch(logout())
          console.error('Session expired. Logging out...')
          break
          
        case 403:
          console.error('Permission denied: You do not have access to this.')
          break

        case 500:
          console.error('Server error: Please try again later.')
          break

        default:
          console.error(`Error ${status}: ${message}`)
      }
      
      // We overwrite the error message with the one from the backend
      // so your components can show the exact reason (e.g., "Wrong password")
      return Promise.reject(new Error(message))
    } 
    
    if (error.request) {
      // The request was made but no response was received (Network error)
      console.error('Network error: No response from server.')
      return Promise.reject(new Error('Network error. Check your connection.'))
    }

    return Promise.reject(error)
  }
)