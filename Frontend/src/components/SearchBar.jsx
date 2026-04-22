import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ placeholder = "Search news, topics, or cities...", width = "w-full" }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef(null); // Shortcut ke liye ref

  // ✅ Keyboard Shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative group ${width}`}
    >
      <div className="relative flex items-center">
        {/* Search Icon */}
        <Search 
          className="absolute left-4 text-slate-400 group-focus-within:text-indigo-600 group-focus-within:scale-110 transition-all duration-300" 
          size={18} 
        />
        
        {/* Input Field */}
        <input 
          ref={inputRef}
          type="text" 
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-24 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-500 focus:bg-white transition-all duration-300 shadow-sm placeholder:text-slate-400"
        />

        {/* Action Buttons (Right Side) */}
        <div className="absolute right-3 flex items-center gap-2">
          <AnimatePresence>
            {query && (
              <>
                {/* Clear Button */}
                <motion.button
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  type="button"
                  onClick={clearSearch}
                  className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400 transition-colors"
                >
                  <X size={14} />
                </motion.button>

                {/* Submit Button (Appears only when typing) */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="submit"
                  className="p-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md shadow-indigo-200 transition-colors"
                >
                  <ArrowRight size={14} />
                </motion.button>
              </>
            )}
          </AnimatePresence>

          {/* Shortcut Hint (Hidden when typing or on mobile) */}
          {!query && (
            <div className="hidden md:flex items-center gap-1 bg-white border border-slate-200 px-1.5 py-0.5 rounded-lg shadow-sm pointer-events-none group-focus-within:opacity-0 transition-opacity">
              <span className="text-[9px] font-black text-slate-400 uppercase">⌘ K</span>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default SearchBar;