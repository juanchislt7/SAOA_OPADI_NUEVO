import axios from 'axios';

const api = axios.create({
  //baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  baseURL: process.env.REACT_APP_API_URL,

  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para manejar tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api; 