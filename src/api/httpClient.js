import axios from 'axios';

// Usamos variable de entorno o fallback a localhost:8080/
const baseUrl =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const http = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});