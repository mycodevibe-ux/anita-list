import axios from 'axios';

const defaultBaseURL = process.env.NEXT_PUBLIC_API_URL || 'https://anita-list-backend-production.up.railway.app/api';

const api = axios.create({
  baseURL: defaultBaseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, 
});

// Intercept requests to add the Bearer token
api.interceptors.request.use((config) => {
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
