import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// --- 1. Pages Import ---
import Login from './components/Pages/Login';
import Register from './components/Pages/Register';
import ForgotPassword from './components/Pages/ForgotPassword';
import ResetPassword from './components/Pages/ResetPassword';
import Home from './components/Pages/Home'; 
import Profile from './components/Pages/Profile';
import NewsDetails from './components/Pages/NewsDetails';
import CategoryNews from './components/Pages/CategoryNews';
import CityNews from './components/Pages/CityNews';
import Search from './components/Pages/Search';
import AdminDashboard from './components/Pages/AdminDashboard';
import JournalistDashboard from './components/Pages/JournalistDashboard';
import SubmitNews from './components/Pages/SubmitNews';


import StateNews from './components/Pages/StateNews';

// --- 2. Protected Route Component ---
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user, loading } = useAuth();
  
  // Wait for auth check to complete before doing anything
  if (loading) return null;

  // No token at all → go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Token exists but user not yet loaded (e.g., profile still being fetched)
  // Don't redirect — wait for user to load
  if (!user) return null;

  // Token + user loaded, but role is not allowed
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* ============================ */}
            {/* ✅ PUBLIC ROUTES */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            
            {/* News & Content */}
            <Route path="/news/:id" element={<NewsDetails />} />
            <Route path="/category/:slug" element={<CategoryNews />} />
            <Route path="/city/:slug" element={<CityNews />} />
            <Route path="/state/:slug" element={<StateNews />} />
            <Route path="/search" element={<Search />} />

            {/* ✅ PROTECTED ROUTES */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/journalist/dashboard" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'reporter']}>
                  <JournalistDashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/submit-news" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'reporter']}>
                  <SubmitNews />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-news/:id" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'reporter']}>
                  <SubmitNews />
                </ProtectedRoute>
              } 
            />




            {/* 404 Page redirect back to home */}
            <Route path="*" element={<Navigate to="/" />} />
            
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;