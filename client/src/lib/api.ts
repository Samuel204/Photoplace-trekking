// API configuration for different environments
const API_BASE_URL = import.meta.env.PROD 
  ? '/api' // In production on Vercel, use relative paths to serverless functions
  : 'http://localhost:3000' // In development, use local server

export const API_ENDPOINTS = {
  escursioni: {
    getAll: `${API_BASE_URL}/escursioni`,
    create: `${API_BASE_URL}/create-escursione`
  }
} as const

export default API_BASE_URL
