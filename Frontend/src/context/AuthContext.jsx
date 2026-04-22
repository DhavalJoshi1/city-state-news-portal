import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

// 1. Create Context
export const AuthContext = createContext(null);

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'newsToken';
const USER_KEY = 'newsUser'; // Key to persist user with role

// 2. Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || null);

  // ✅ FIX: Load user from localStorage on startup so role is available immediately (even after refresh)
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  // Helper to update user state + localStorage together
  const saveUser = (userData) => {
    if (userData) {
      localStorage.setItem(USER_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(USER_KEY);
    }
    setUser(userData);
  };

  // Axios Global Configuration
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // --- Verify Session on Mount (re-fetch fresh user from server) ---
  useEffect(() => {
    const verifySession = async () => {
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` }
          });

          // ✅ FIX: The profile endpoint returns user in res.data.data
          // We merge the server data with existing cached user to ensure role is always present
          const serverUser = res.data.data;
          if (serverUser) {
            // If server user has no role (older backend), use cached role
            const cachedUser = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
            const mergedUser = { 
              ...cachedUser, 
              ...serverUser,
              role: serverUser.role || cachedUser.role 
            };
            saveUser(mergedUser);
          }
        } catch (error) {
          console.error("Session verify failed:", error?.response?.status, error?.message);
          // Only logout on 401 (unauthorized), not on network errors
          if (error?.response?.status === 401) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    verifySession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // --- Login Feature ---
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { user: userData, token: accessToken } = res.data;

      // ✅ FIX: Save token AND full user (with role) to localStorage
      localStorage.setItem(TOKEN_KEY, accessToken);
      setToken(accessToken);
      saveUser(userData);

      // Set axios default header immediately
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      return { success: true, user: userData };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Login failed" 
      };
    }
  };

  // --- Register Feature ---
  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      if (res.data.success) {
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Registration failed" 
      };
    }
  };

  // --- Logout Feature ---
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY); // ✅ FIX: Also clear user from localStorage
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  // Global values for the app
  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isReporter: user?.role === 'reporter' || user?.role === 'admin',
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};