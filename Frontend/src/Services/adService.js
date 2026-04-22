import API from './api';

export const adService = {
  // Fetch ads based on location (Home, Sidebar, etc.)
  getAdsByPosition: (position) => API.get(`/ads/active?position=${position}`),

  // Tracking analytics
  trackClick: (adId) => API.post(`/ads/${adId}/click`),
  
  trackImpression: (adId) => API.post(`/ads/${adId}/impression`),
};