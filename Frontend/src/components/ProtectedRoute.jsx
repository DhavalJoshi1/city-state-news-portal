import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoutes = ({ isAdmin }) => {
  // Real logic mein yahan hum check karenge (localStorage or Redux state)
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) return <Navigate to="/login" replace />;
  if (isAdmin && userRole !== 'admin') return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
};

export default ProtectRoutes;