import axios from 'axios';

export const getApiBaseUrl = () => {
  let envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!envUrl || envUrl.includes('localhost') || envUrl.includes('127.0.0.1')) {
    envUrl = 'https://anita-list-backend-production.up.railway.app/api';
  }
  if (envUrl.startsWith('http://')) {
    envUrl = envUrl.replace('http://', 'https://');
  }
  return envUrl.replace(/\/api\/?$/, '');
};

const api = axios.create({
  baseURL: `${getApiBaseUrl()}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
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
