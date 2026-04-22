import React from 'react';
import { Newspaper, Search, Bell, UserCircle } from 'lucide-react';

const Header = ({ title }) => {
  return (
    <header className="bg-black border-b border-slate-800 sticky top-0 z-50 py-4 px-10 flex items-center justify-between">
      
      {/* --- MODERN LOGO SECTION --- */}
      <div className="flex items-center gap-3 group cursor-pointer">
        {/* Logo Icon with Indigo Gradient */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2.5 rounded-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform duration-300">
          <Newspaper className="text-white" size={26} />
        </div>
        
        {/* Logo Text: CITY STATE NEWS PORTAL */}
        <div className="hidden sm:block text-left">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white leading-none">
            <span className="group-hover:text-indigo-400 transition">CITY STATE</span>{' '}
            <span className="text-indigo-500 group-hover:text-white transition">NEWS PORTAL</span>
          </h1>
          <p className="text-[10px] text-gray-600 font-black tracking-[0.25em] mt-1 uppercase relative pl-6">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-slate-700"></span>
            {title || "Admin Dashboard"}
          </p>
        </div>
      </div>

      {/* --- SEARCH BAR (Pill Style) --- */}
      <div className="hidden lg:flex items-center relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-indigo-500 transition" size={18} />
        <input 
          type="text" 
          placeholder="Search news, articles, users..." 
          className="bg-slate-900 border border-slate-800 rounded-full pl-12 pr-6 py-3 text-sm text-white focus:outline-none focus:border-indigo-600 w-96 transition-all focus:ring-1 focus:ring-indigo-600/30 placeholder:text-gray-600" 
        />
      </div>

      {/* --- RIGHT SECTION: ADMIN & NOTIFICATIONS --- */}
      <div className="flex items-center gap-6">
        
        {/* Notifications */}
        <button className="p-3 text-gray-500 hover:bg-slate-900 rounded-full relative transition-all group">
          <Bell size={20} className="group-hover:text-white group-hover:rotate-12 transition-transform" />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-black"></span>
        </button>
        
        {/* Separator Line */}
        <div className="h-8 w-[1px] bg-slate-800 mx-1"></div>

        {/* User Profile: Zeeshan Khan */}
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition">Zeeshan Khan</p>
            <p className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">Super Admin</p>
          </div>
          
          {/* Circular Avatar */}
          <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-gray-500 border-2 border-slate-800 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-all duration-300 shadow-xl shadow-indigo-500/10 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
             <UserCircle size={28} className="relative z-10" />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;