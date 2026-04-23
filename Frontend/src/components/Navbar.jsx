import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Search, Command, Menu, X, LogOut, Bell, Newspaper, PenTool 
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth'; 
import { BASE_URL } from '../Utils/constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user, token, logout, isAdmin, isReporter } = useAuth(); 

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Notifications fetch karne ke liye function
  const fetchNotifications = async () => {
    if (!isAuthenticated || !token) return;
    try {
      const response = await axios.get(`${BASE_URL}/v1/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(response.data.data.notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 1 minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, [isAuthenticated, token]);

  const markAllAsRead = async () => {
    try {
      await axios.patch(`${BASE_URL}/v1/notifications/mark-as-read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  // Search handle karne ke liye function
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setIsOpen(false);
    }
  };

  const navItemStyles = ({ isActive }) => 
    `transition-all duration-300 hover:text-[#FDE047] ${isActive ? 'text-[#FDE047] border-b-2 border-blue-400 pb-1' : 'text-[#D4AF37]'}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0B1120]/80 backdrop-blur-md border-b border-[#B8860B]/20 h-20 font-sans">
      <div className="max-w-[1440px] mx-auto h-full px-6 flex items-center justify-between">
        
        {/* --- LOGO SECTION --- */}
        <Link to="/" className="flex items-center gap-4 cursor-pointer group mr-12">
          <div className="bg-[#D4AF37] p-2.5 rounded-xl group-hover:rotate-12 transition-transform duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Newspaper size={24} className="text-black" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-[#D4AF37] uppercase italic leading-none">
            City State <br/> <span className="text-[14px] text-[#8B6508]/80 tracking-[0.2em]">News Portal</span>
          </h1>
        </Link>

        {/* --- DESKTOP NAV LINKS --- */}
        <div className="hidden lg:flex items-center gap-12 text-[11px] font-black tracking-[0.2em] uppercase text-[#D4AF37]">
          <NavLink to="/category/world" className={navItemStyles}>World</NavLink>
          <NavLink to="/category/technology" className={navItemStyles}>Technology</NavLink>
          <NavLink to="/category/business" className={navItemStyles}>Business</NavLink>
          <NavLink to="/category/politics" className={navItemStyles}>Politics</NavLink>
          <NavLink to="/category/sports" className={navItemStyles}>Sports</NavLink>
        </div>

        {/* --- SEARCH BAR (Desktop) --- */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-10">
          <div className="relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8860B] group-focus-within:text-[#FDE047] transition-colors" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search news, topics..." 
              className="w-full bg-[#0F172A] border border-[#B8860B]/30 rounded-2xl py-2.5 pl-12 pr-12 text-[#D4AF37] text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/30 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[#0B1120] border border-[#B8860B]/30 px-2 py-0.5 rounded-lg opacity-50">
              <Command size={10} className="text-[#B8860B]" />
              <span className="text-[10px] font-bold text-[#B8860B]">K</span>
            </div>
          </div>
        </div>

        {/* --- AUTH & ACTIONS (Desktop) --- */}
        <div className="hidden lg:flex items-center gap-6">
          {!isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-[#D4AF37] text-xs font-black uppercase tracking-widest hover:text-[#FDE047] transition-all">
                Login
              </Link>
              <Link to="/register" className="bg-[#D4AF37] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#F3CA3E] transition-all shadow-lg shadow-[#8B6508]/20 active:scale-95">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-[#B8860B] hover:text-[#FDE047] transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border border-black animate-pulse"></span>
                </button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-4 w-72 bg-[#0B1120] border border-[#B8860B]/30 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 bg-[#D4AF37]/10 border-b border-[#B8860B]/20 flex justify-between items-center">
                      <h3 className="text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">Notifications</h3>
                      {notifications.some(n => !n.isRead) && (
                        <button 
                          onClick={markAllAsRead}
                          className="text-[#FDE047] text-[9px] font-bold uppercase hover:underline"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((n) => (
                          <div 
                            key={n._id} 
                            className={`p-4 border-b border-[#B8860B]/10 hover:bg-white/5 transition-colors cursor-pointer ${!n.isRead ? 'bg-[#D4AF37]/5' : ''}`}
                          >
                            <p className="text-[#D4AF37] text-xs font-medium leading-relaxed">{n.text}</p>
                            <span className="text-[10px] text-[#B8860B]/60 mt-1 block font-bold">
                              {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <Bell size={24} className="mx-auto text-[#B8860B]/20 mb-2" />
                          <p className="text-[#B8860B]/40 text-[10px] font-bold uppercase">No new updates</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

               <div className="flex items-center gap-3 bg-[#0F172A] p-1.5 pr-3 rounded-full border border-[#B8860B]/30 hover:border-[#D4AF37]/50 transition-all">
                {isAdmin && (
                  <Link 
                    to="/admin/dashboard" 
                    className="p-2 flex items-center gap-2 text-[#B8860B] hover:text-[#D4AF37] transition-colors" 
                    title="Admin Dashboard"
                  >
                    <Command size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Admin</span>
                  </Link>
                )}
                {isReporter && (
                  <Link 
                    to="/journalist/dashboard" 
                    className="p-2 flex items-center gap-2 text-[#B8860B] hover:text-[#D4AF37] transition-colors" 
                    title="Journalist Dashboard"
                  >
                    <PenTool size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Journalist</span>
                  </Link>
                )}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#FDE047] flex items-center justify-center text-black text-xs font-black shadow-inner">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <button 
                  onClick={() => {
                    logout();
                    navigate('/');
                  }} 
                  className="text-[#B8860B] hover:text-red-500 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- MOBILE HAMBURGER --- */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-[#D4AF37] p-2 hover:bg-[#0F172A] rounded-lg transition-colors">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      {isOpen && (
        <div className="lg:hidden bg-[#0B1120]/95 backdrop-blur-xl border-t border-[#B8860B]/20 absolute w-full left-0 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="px-8 py-10 flex flex-col gap-8">
            
            {/* Search in Mobile Menu */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8860B]" size={18} />
              <input 
                type="text" 
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search..." 
                className="w-full bg-[#0F172A] border border-[#B8860B]/30 rounded-xl py-3 pl-12 text-[#D4AF37]"
              />
            </div>

            <div className="flex flex-col gap-8 text-sm font-black text-[#D4AF37] uppercase tracking-[0.3em]">
              <NavLink to="/category/world" onClick={toggleMenu} className={navItemStyles}>World</NavLink>
              <NavLink to="/category/technology" onClick={toggleMenu} className={navItemStyles}>Technology</NavLink>
              <NavLink to="/category/business" onClick={toggleMenu} className={navItemStyles}>Business</NavLink>
            </div>

            <hr className="border-[#B8860B]/10" />

            <div className="flex flex-col gap-4">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={toggleMenu} className="w-full text-center py-4 font-black text-[#D4AF37] border border-[#B8860B]/30 rounded-2xl hover:bg-[#0F172A]">
                    LOGIN
                  </Link>
                  <Link to="/register" onClick={toggleMenu} className="w-full text-center py-4 font-black bg-[#D4AF37] text-black rounded-2xl">
                    SIGN UP
                  </Link>
                </>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between bg-[#0F172A] p-4 rounded-2xl border border-[#B8860B]/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-black font-black text-lg">
                        {user?.name?.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                         <span className="font-black text-[#D4AF37] tracking-widest uppercase">{user?.name}</span>
                         <span className="text-[10px] text-[#8B6508] font-bold italic">
                           {isAdmin ? 'Administrator' : isReporter ? 'Journalist' : 'Active Member'}
                         </span>
                      </div>
                    </div>
                    {isAdmin && (
                      <Link to="/admin/dashboard" onClick={toggleMenu} className="flex items-center gap-2 p-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg">
                        <Command size={20} />
                        <span className="text-xs font-black uppercase">Admin</span>
                      </Link>
                    )}
                    {isReporter && (
                      <Link to="/journalist/dashboard" onClick={toggleMenu} className="flex items-center gap-2 p-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg">
                        <PenTool size={20} />
                        <span className="text-xs font-black uppercase">Journalist</span>
                      </Link>
                    )}
                  </div>
                  <button onClick={() => { logout(); toggleMenu(); navigate('/'); }} className="w-full py-4 bg-red-950/20 text-red-500 border border-red-950/30 font-black rounded-2xl hover:bg-red-900/30 transition-all">
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;