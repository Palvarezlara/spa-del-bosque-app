import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adjuntar JWT si existe
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('spa-bosque-auth');
    if (raw) {
      const { token } = JSON.parse(raw);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // ignorar errores de parseo
  }
  return config;
});