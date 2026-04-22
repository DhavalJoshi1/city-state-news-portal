import axios from 'axios';

// 🛠️ FIX 1: v1 add kiya (Backend se match karne ke liye)
const API_URL = 'http://localhost:5000/api/v1';

export const getNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/news`);
    // ResponseHandler.success use kiya tha humne, isliye data.news milega
    return response.data.news || response.data;
  } catch (error) {
    console.error("Error fetching all news:", error);
    return [];
  }
};

export const getNewsByCategory = async (category) => {
  try {
    // 🛠️ FIX 2: Check karein backend category ID le raha hai ya Name
    const response = await axios.get(`${API_URL}/news`, {
      params: { category } // Automatically ?category=name bna dega
    });
    
    return response.data.news || response.data;
  } catch (error) {
    console.error(`Error fetching news for category ${category}:`, error);
    return [];
  }
};

export const getNewsById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/news/${id}`);
    return response.data.news || response.data;
  } catch (error) {
    console.error("Error fetching news detail:", error);
    return null;
  }
};

const newsService = {
  getNews,
  getNewsByCategory,
  getNewsById
};

export default newsService;