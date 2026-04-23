import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom Hook: useAuth
 * Purpose: Provides easy access to User State, Login, Logout, and Permissions.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  // Safety Check: Agar AuthProvider wrap nahi kiya toh error throw karega
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider. Check your App.jsx wrapping!');
  }

  // Return the entire context so all values (like isReporter) are available
  return context;
};

export default useAuth;