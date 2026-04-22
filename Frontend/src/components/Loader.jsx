import React from 'react';

// Full Screen Loader
export const Loader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[999] flex items-center justify-center">
    <Spinner />
  </div>
);

// Component Level Spinner
export const Spinner = () => (
  <div className="relative w-12 h-12">
    <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
    <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
  </div>
);
export default Loader;