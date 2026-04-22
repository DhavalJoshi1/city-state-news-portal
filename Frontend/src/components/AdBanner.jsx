import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info, ExternalLink } from 'lucide-react';

const AdBanner = ({ slotId, format = "horizontal" }) => {
  const [loading, setLoading] = useState(true);

  // Simulating ad load
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Ad formats styling
  const containerStyles = {
    horizontal: "w-full h-32 md:h-40",
    vertical: "w-64 h-[600px]",
    square: "w-full aspect-square"
  };

  return (
    <div className={`relative mx-auto my-8 ${containerStyles[format]} group`}>
      {/* --- Ad Label --- */}
      <div className="absolute -top-3 left-4 z-10 flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sponsored</span>
        <Info size={10} className="text-slate-300" />
      </div>

      {/* --- Loading State (Skeleton) --- */}
      {loading ? (
        <div className="w-full h-full bg-slate-100 animate-pulse rounded-[32px] border-2 border-dashed border-slate-200 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
            <div className="w-32 h-3 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      ) : (
        /* --- Actual Ad Content --- */
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-full overflow-hidden rounded-[32px] border border-slate-100 bg-gradient-to-r from-slate-50 to-white shadow-xl shadow-slate-200/40 flex items-center justify-between px-8 md:px-12 group"
        >
          {/* Ad Background Pattern (Optional) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 w-full">
            {/* Ad Image / Placeholder */}
            <div className="w-20 h-20 md:w-24 md:h-24 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 flex-shrink-0">
              <span className="font-black text-xl italic">ADS</span>
            </div>

            {/* Ad Text */}
            <div className="text-center md:text-left flex-grow">
              <h4 className="text-lg font-black text-slate-800 leading-tight">Grow your business with City State News</h4>
              <p className="text-slate-500 text-sm font-medium mt-1">Reach 1M+ local readers every month. Get started today!</p>
            </div>

            {/* Ad Button */}
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-lg group-hover:scale-105">
              Advertise Now <ExternalLink size={14} />
            </button>
          </div>

          {/* Close/Action indicator */}
          <button className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition-colors">
            <span className="sr-only">Close</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default AdBanner;