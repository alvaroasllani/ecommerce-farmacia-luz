// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// API client configuration
export const apiClient = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Generic API call function
export async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Add auth token if available
  const token = localStorage.getItem('token');
  const headers = {
    ...apiClient.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// HTTP Methods
export const api = {
  get: <T>(endpoint: string) => apiCall<T>(endpoint, { method: 'GET' }),
  post: <T>(endpoint: string, data?: any) => 
    apiCall<T>(endpoint, { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
  put: <T>(endpoint: string, data?: any) => 
    apiCall<T>(endpoint, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }),
  delete: <T>(endpoint: string) => apiCall<T>(endpoint, { method: 'DELETE' }),
}; 