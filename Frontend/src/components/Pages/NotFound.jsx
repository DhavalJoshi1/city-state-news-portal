import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
    <h1 className="text-[12rem] font-black text-gray-100 leading-none">404</h1>
    <div className="absolute">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Whoops! Page not found.</h2>
      <p className="text-gray-500 mb-8 max-w-sm mx-auto">The news you are looking for might have been moved or deleted.</p>
      <Link to="/" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition">
        <Home size={20}/> Back to Home
      </Link>
    </div>
  </div>
);

export default NotFound;