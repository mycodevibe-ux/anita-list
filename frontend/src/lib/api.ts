import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  // Ensure withCredentials is true if we ever switch to stateful cookies, 
  // but for token-based auth, we just rely on the interceptor.
  withCredentials: false, 
});

// Intercept requests to add the Bearer token
api.interceptors.request.use((config) => {
  // We'll read the token from localStorage if it exists
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
