import axios from 'axios';

/**
 * API Instance Configuration
 * Using Vite Environment Variables for security and flexibility.
 */
const API = axios.create({
  // .env file se URL uthayega
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1',
  timeout: 15000, // 15 seconds tak response na mile toh request cancel kar dega
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// --- REQUEST INTERCEPTOR ---
// Har request jane se pehle check karega ki token available hai ya nahi
API.interceptors.request.use(
  (config) => {
    // .env mein jo key di hai wahi use karein (Default: news_auth_token)
    const tokenKey = import.meta.env.VITE_TOKEN_KEY || 'news_auth_token';
    const token = localStorage.getItem(tokenKey);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// --- RESPONSE INTERCEPTOR ---
// API se response aane ke baad global error handling ke liye
API.interceptors.response.use(
  (response) => {
    // Agar response successful hai toh seedha data return karein
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    // 1. Agar Token Expire ho gaya (401 Unauthorized)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      console.warn("Session expired. Logging out...");
      
      const tokenKey = import.meta.env.VITE_TOKEN_KEY || 'news_auth_token';
      localStorage.removeItem(tokenKey);
      
      // User ko login page par redirect karein (Agar window available ho)
      if (typeof window !== 'undefined') {
        window.location.href = '/login?message=session_expired';
      }
    }

    // 2. Server Down ya Network Error (No Response)
    if (!error.response) {
      console.error("Network Error: Please check if your backend server is running.");
    }

    // 3. Validation Errors (400, 422 etc)
    const errorMessage = error.response?.data?.message || "Something went wrong with the API";
    
    return Promise.reject(errorMessage);
  }
);

export default API;