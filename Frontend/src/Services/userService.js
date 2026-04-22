import API from './api';

export const userService = {
  getProfile: () => API.get('/users/profile'),

  updateProfile: (data) => API.put('/users/profile', data),

  updateAvatar: (formData) => API.post('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  getSavedNews: () => API.get('/users/saved-news'),

  // Social linking (if applicable)
  linkSocialAccount: (provider, data) => API.post(`/users/link/${provider}`, data),
};