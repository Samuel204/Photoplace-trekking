// API configuration for different environments
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const apiConfig = {
  baseUrl: API_BASE_URL,
  endpoints: {
    escursioni: {
      getAll: `${API_BASE_URL}/escursioni/all`,
      create: `${API_BASE_URL}/escursioni`,
    }
  }
};

// Helper function to make API calls
export const apiCall = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  return response.json();
};

export default apiConfig;
