/**
 * helpers.js - Global Helper Functions for NewsHub 2026
 */

// 1. Image Placeholder Helper
// Agar API se image nahi aati ya broken hoti hai, toh yeh fallback image deta hai
export const getSafeImage = (url, type = 'news') => {
  const fallbacks = {
    news: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800',
    avatar: 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff',
    ad: 'https://placehold.co/600x400?text=Advertisement+Space'
  };
  
  if (!url || url === '' || url === 'undefined') return fallbacks[type];
  return url;
};

// 2. SEO Title & Slug Helper
// Browser tab title aur URL slugs ko clean aur professional banata hai
export const formatPageTitle = (title) => {
  return `${title} | NewsHub - Global Updates 2026`;
};

export const createSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Space ko dash (-) se badlo
    .replace(/[^\w-]+/g, '')  // Non-word chars hatao
    .replace(/--+/g, '-');    // Multiple dashes ko single karo
};

// 3. Social Share Helper
// Native Share API use karta hai (Mobile par "Share Menu" khulega)
export const shareContent = async (title, text, url) => {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return { success: true };
    } catch (err) {
      console.log('Share cancelled or failed', err);
      return { success: false };
    }
  } else {
    // Fallback: Copy to clipboard
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  }
};

// 4. Currency & Number Formatter (Advanced)
// Analytics ya Business news ke liye numbers ko 'K', 'M', 'B' mein convert karta hai
export const formatCompactNumber = (number) => {
  const formatter = Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1,
  });
  return formatter.format(number);
};

// 5. Scroll to Top Helper
// Jab user route change kare toh smoothly top par le jaye
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

// 6. Local Storage Helper with Expiry (Advanced)
// Data ko expiry time ke saath store karta hai (e.g., Cache for 1 hour)
export const setItemWithExpiry = (key, value, ttlInMinutes) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttlInMinutes * 60000,
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getItemWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};

// 7. Reading Time Calculator
export const getReadingTime = (content) => {
  const wordsPerMinute = 225;
  const noOfWords = content.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
};