import API from './api';

export const authService = {
  login: async (credentials) => {
    const res = await API.post('/auth/login', credentials);
    return res.data;
  },

  register: async (userData) => {
    const res = await API.post('/auth/register', userData);
    return res.data;
  },

  verifyEmail: (token) => API.get(`/auth/verify-email?token=${token}`),
  
  forgotPassword: (email) => API.post('/auth/forgot-password', { email }),
  
  resetPassword: (data) => API.post('/auth/reset-password', data),
};