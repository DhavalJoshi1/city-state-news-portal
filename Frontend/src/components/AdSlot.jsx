import React from 'react';

const AdSlot = ({ type, label }) => {
  // Professional Advertisment Image (City Skyline)
  const adImage = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1500&auto=format&fit=crop";

  if (type === "horizontal") {
    return (
      <div className="w-full h-48 md:h-56 bg-slate-900 rounded-[40px] overflow-hidden border border-slate-800 relative group cursor-pointer shadow-2xl">
        {/* Ad Image Background */}
        <img 
          src={adImage} 
          alt="Advertisement" 
          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-2 bg-indigo-950/50 px-3 py-1 rounded-full">
            {label || "Sponsored Advertisement"}
          </span>
          <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tight">
            INVEST IN THE FUTURE OF CITY INFRASTRUCTURE
          </h3>
          <p className="text-gray-400 text-xs mt-2 font-medium">Contact: ads@cityportal.com</p>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
    );
  }

  // Vertical Ad for Sidebar
  return (
    <div className="w-full h-[400px] bg-gradient-to-b from-slate-900 to-black rounded-[32px] overflow-hidden border border-slate-800 relative group cursor-pointer">
      <img 
        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800" 
        alt="Vertical Ad" 
        className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-4">Partner Content</span>
        <h4 className="text-lg font-bold text-white uppercase leading-tight">Build Your Dream Project Today</h4>
        <button className="mt-6 px-6 py-2 bg-indigo-600 text-white text-[10px] font-black rounded-full hover:bg-white hover:text-indigo-600 transition-all">
          LEARN MORE
        </button>
      </div>
    </div>
  );
};

export default AdSlot;