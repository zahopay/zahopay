import axios from 'axios';

const backendUrl = 'https://api.zahopay.in';

const api = axios.create({
  baseURL: backendUrl,
  withCredentials: true, // Essential for cookies
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors
      if (window.location.pathname.startsWith('/administrator')) {
        window.location.href = '/administrator/adminlogin';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
