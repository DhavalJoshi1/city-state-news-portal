import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PenTool, 
  FileText, 
  Settings, 
  BarChart3, 
  LogOut, 
  UserCircle,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { 
      title: 'Dashboard', 
      path: user?.role === 'admin' ? '/admin/dashboard' : '/journalist/dashboard', 
      icon: LayoutDashboard 
    },
    { 
      title: 'Write News', 
      path: '/journalist/create-post', 
      icon: PenTool 
    },
    { 
      title: 'My Articles', 
      path: '/journalist/my-posts', 
      icon: FileText 
    },
    { 
      title: 'Analytics', 
      path: '/admin/analytics', 
      icon: BarChart3,
      adminOnly: true 
    },
    { 
      title: 'Settings', 
      path: '/settings', 
      icon: Settings 
    },
  ];

  return (
    <aside className="w-72 h-[calc(100vh-120px)] sticky top-24 hidden lg:flex flex-col bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 p-6">
      
      {/* User Profile Summary */}
      <div className="flex items-center gap-3 p-4 mb-8 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
        <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
          <UserCircle size={28} />
        </div>
        <div className="flex flex-col overflow-hidden">
          <span className="font-black text-slate-900 truncate">{user?.name || 'Journalist'}</span>
          <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{user?.role || 'Author'}</span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow space-y-2">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>
        
        {menuItems.map((item) => {
          // Admin check logic
          if (item.adminOnly && user?.role !== 'admin') return null;

          const isActive = location.pathname === item.path;

          return (
            <Link 
              key={item.title} 
              to={item.path}
              className={`flex items-center justify-between group px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                isActive 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                <span className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-600'}`}>
                  {item.title}
                </span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button 
        onClick={logout}
        className="mt-auto flex items-center gap-3 px-6 py-4 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all group"
      >
        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
        Logout Session
      </button>
    </aside>
  );
};

export default Sidebar;