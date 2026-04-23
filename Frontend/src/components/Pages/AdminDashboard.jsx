import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../Navbar';
import { 
  CheckCircle, XCircle, Clock, Trash2, Edit3, 
  Users, Newspaper, BarChart3, Settings, 
  Search, ShieldAlert, Plus, Zap, ArrowUpRight, 
  MoreHorizontal, Eye, MessageSquare, Filter,
  RefreshCw, Activity, Database, Server, Smartphone, TrendingUp
} from 'lucide-react';

const AdminDashboard = () => {
    const { token, logout, user: currentUser } = useAuth();
    const navigate = useNavigate();
    const [news, setNews] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [activeTab, setActiveTab] = useState('content');
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);

    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [newsRes, statsRes, usersRes] = await Promise.all([
                axios.get(`${API_URL}/news/admin/all`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${API_URL}/news/admin/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${API_URL}/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);
            setNews(newsRes.data.data.news || []);
            setStats(statsRes.data.data);
            setUsers(usersRes.data.data.users || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching admin data:", error);
            setError("Connectivity issue detected. Please check server status.");
            if (error.response?.status === 401) {
                setError("Session expired. Re-authorizing...");
                setTimeout(() => logout(), 2000);
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchData();
    }, [token]);

    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.patch(`${API_URL}/news/${id}/status`, { status }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNews(news.map(item => item._id === id ? { ...item, status } : item));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("CRITICAL: Delete this content permanently?")) return;
        try {
            await axios.delete(`${API_URL}/news/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNews(news.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting news:", error);
        }
    };

    const filteredNews = news.filter(n => 
        n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.createdBy?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredUsers = users.filter(u => 
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return (
        <div className="min-h-screen bg-[#060B19] flex items-center justify-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50"></div>
            <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full z-10"
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#060B19] text-slate-300 font-sans selection:bg-[#D4AF37] selection:text-white">
            <Navbar />
            
            <div className="flex pt-20 h-screen overflow-hidden">
                {/* --- sidebar --- */}
                <aside className="w-72 bg-[#0B1120]/40 backdrop-blur-xl border-r border-white/5 flex flex-col p-6 z-40">
                    <div className="mb-10 px-4">
                        <div className="flex items-center gap-3 text-white">
                            <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center font-black">N</div>
                            <span className="font-black uppercase tracking-tighter italic text-xl">Nexus<span className="text-[#D4AF37]">Pro</span></span>
                        </div>
                    </div>

                    <nav className="space-y-1.5 flex-grow">
                        {[
                            { id: 'content', label: 'News Intelligence', icon: Newspaper },
                            { id: 'users', label: 'User Directory', icon: Users },
                            { id: 'analytics', label: 'Traffic Analysis', icon: BarChart3 },
                            { id: 'revenue', label: 'Ad Cloud (Sim)', icon: Zap },
                            { id: 'health', label: 'System Health', icon: ShieldAlert },
                        ].map(item => (
                            <button 
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all group ${activeTab === item.id ? 'bg-[#D4AF37] text-white shadow-lg shadow-[#8B6508]/40' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}
                            >
                                <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'group-hover:text-[#FDE047]'} />
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="pt-6 border-t border-white/5">
                        <button 
                            onClick={() => setActiveTab('settings')}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'settings' ? 'bg-white/10 text-white' : 'text-slate-500 hover:bg-white/5'}`}
                        >
                            <Settings size={18} /> Settings
                        </button>
                    </div>
                </aside>

                {/* --- main content area --- */}
                <main className="flex-1 overflow-y-auto px-8 py-10 custom-scrollbar">
                    
                    {/* Top Bar */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <motion.h1 
                                layoutId="title"
                                className="text-4xl font-black text-white uppercase italic tracking-tighter"
                            >
                                Admin <span className="text-[#D4AF37] font-black">Nexus.</span>
                            </motion.h1>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                <p className="text-[#B8860B] font-black text-[10px] uppercase tracking-[0.3em]">Operational Cluster: Node-01 (ACTIVE)</p>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest">
                                <ShieldAlert size={16} /> {error}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B8860B] group-focus-within:text-[#FDE047] transition-colors" size={16} />
                                <input 
                                    type="text" 
                                    placeholder="Search entire grid..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-[#0B1120] border border-white/5 rounded-2xl py-3.5 pl-12 pr-6 text-sm outline-none focus:border-[#D4AF37]/50 min-w-[320px] transition-all placeholder:text-slate-700"
                                />
                            </div>
                            <button 
                                onClick={fetchData} 
                                className="p-3.5 bg-white/5 hover:bg-white/10 rounded-2xl text-[#FDE047] transition-all active:rotate-180 duration-500"
                                title="Sync Intel"
                            >
                                <RefreshCw size={20} />
                            </button>
                            <Link to="/submit-news" className="bg-[#D4AF37] text-white px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#F3CA3E] transition-all flex items-center gap-2 shadow-2xl shadow-[#8B6508]/40 transform active:scale-95">
                                <Plus size={16} /> Deploy Intel
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: 'Cloud Dispatch', value: news.length, sub: 'Stories Live', icon: Newspaper, color: 'blue' },
                            { label: 'Civilian Access', value: stats?.totalUsers || users.length, sub: 'System Users', icon: Users, color: 'purple' },
                            { label: 'Uptime Pulse', value: '99.9%', sub: 'Node Stability', icon: Activity, color: 'emerald' },
                            { label: 'Net Gain (24h)', value: '+12.4%', sub: 'Traffic Growth', icon: TrendingUp, iconColor: 'emerald' },
                        ].map((s, i) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                key={i} 
                                className="bg-[#0F172A] border border-white/5 p-8 rounded-[2.5rem] relative group hover:border-[#B8860B]/30 transition-all shadow-xl"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="text-slate-500"><s.icon size={20} /></div>
                                    <div className="text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg text-[8px] font-black tracking-widest">+4.2%</div>
                                </div>
                                <h2 className="text-4xl font-black text-white italic tracking-tighter">{s.value}</h2>
                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">{s.label}</p>
                                <p className="text-[8px] text-[#8B6508] font-bold uppercase mt-2">{s.sub}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Conditional Rendering Tab Content */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'content' && (
                            <motion.div 
                                key="content"
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                className="bg-[#0F172A] border border-white/5 rounded-[3rem] overflow-hidden backdrop-blur-md shadow-2xl"
                            >
                                <div className="p-10 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                                    <div className="flex items-center gap-6">
                                        <h2 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-3">
                                            <Newspaper className="text-[#D4AF37]" size={16} /> Intelligence Hub
                                        </h2>
                                        <div className="h-4 w-px bg-white/5"></div>
                                        <div className="flex gap-2">
                                            {['published', 'pending', 'rejected'].map(st => (
                                                <button key={st} className="px-4 py-1.5 rounded-full text-[8px] font-black uppercase border border-white/5 text-slate-500 hover:text-white transition-colors">{st}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-white transition-colors">
                                        <Filter size={14} /> Refine View
                                    </button>
                                </div>
                                
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-[#0B1120] text-[#B8860B] text-[9px] font-black uppercase tracking-[0.2em]">
                                                <th className="px-10 py-5">Source Identification</th>
                                                <th className="px-10 py-5">Sector</th>
                                                <th className="px-10 py-5">Dispatch Unit</th>
                                                <th className="px-10 py-5">Live State</th>
                                                <th className="px-10 py-5 text-right">Operations</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {filteredNews.map((item) => (
                                                <tr key={item._id} className="hover:bg-white/[0.015] transition-colors group">
                                                    <td className="px-10 py-7">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-12 h-12 rounded-2xl bg-white/5 overflow-hidden shrink-0 border border-white/5 group-hover:border-[#D4AF37]/30 transition-all transform group-hover:scale-105">
                                                                <img src={item.image ? (item.image.startsWith('http') ? item.image : `http://localhost:5000/${item.image.replace(/\\/g, '/')}`) : 'https://images.unsplash.com/photo-1504711432869-efd297920786?auto=format&fit=crop&q=80&w=100'} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all opacity-40 group-hover:opacity-100" />
                                                            </div>
                                                            <div className="flex flex-col min-w-0">
                                                                <span className="text-white text-sm font-bold truncate tracking-tight">{item.title}</span>
                                                                <span className="text-[10px] text-slate-600 font-bold uppercase mt-1">ID-DISPATCH: {item._id.slice(-6)}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-7">
                                                        <span className="bg-[#D4AF37]/5 text-[#F3CA3E] px-3 py-1.5 rounded-lg text-[9px] font-black uppercase border border-[#D4AF37]/10 tracking-widest">
                                                            {item.category?.name || 'GEN-INTEL'}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-7">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-[10px] text-white font-black shadow-lg shadow-[#8B6508]/30">
                                                                {item.createdBy?.name?.charAt(0) || 'U'}
                                                            </div>
                                                            <span className="text-xs font-bold text-slate-400">{item.createdBy?.name || 'Operative-UN'}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-10 py-7">
                                                        <span className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                                            item.status === 'published' ? 'bg-emerald-500/5 text-emerald-400 border border-emerald-500/10' : 
                                                            item.status === 'pending' ? 'bg-amber-500/5 text-amber-400 border border-amber-500/10' : 
                                                            'bg-rose-500/5 text-rose-400 border border-rose-500/10'
                                                        }`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'published' ? 'bg-emerald-400 animate-pulse' : item.status === 'pending' ? 'bg-amber-400' : 'bg-rose-400'}`}></div>
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-10 py-7 text-right">
                                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            {item.status !== 'published' && (
                                                                <button onClick={() => handleStatusUpdate(item._id, 'published')} className="p-3 text-emerald-400 hover:bg-emerald-400/10 rounded-2xl transition-all" title="Authorize"><CheckCircle size={18} /></button>
                                                            )}
                                                            <Link to={`/edit-news/${item._id}`} className="p-3 text-[#FDE047] hover:bg-[#FDE047]/10 rounded-2xl transition-all"><Edit3 size={18} /></Link>
                                                            <button onClick={() => handleDelete(item._id)} className="p-3 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all"><Trash2 size={18} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            {filteredNews.length === 0 && (
                                                <tr>
                                                    <td colSpan="5" className="py-32 text-center">
                                                        <Newspaper size={48} className="mx-auto text-white/5 mb-4" />
                                                        <p className="text-slate-600 font-black uppercase text-[10px] tracking-widest">No active dispatch found in sector</p>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'users' && (
                            <motion.div 
                                key="users"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-[#0F172A] border border-white/5 rounded-[3rem] overflow-hidden"
                            >
                                <div className="p-10 border-b border-white/5 bg-white/[0.01]">
                                    <h2 className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-3">
                                        <Users className="text-[#D4AF37]" size={16} /> Operative Register
                                    </h2>
                                </div>
                                <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredUsers.map(u => (
                                        <div key={u._id} className="bg-[#0B1120] border border-white/5 p-8 rounded-[2rem] hover:border-[#D4AF37]/20 transition-all flex items-center gap-6 group">
                                            <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-slate-800 to-black border border-white/5 flex items-center justify-center text-xl font-black text-white group-hover:scale-110 transition-transform">
                                                {u.name?.charAt(0)}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-white font-bold uppercase text-sm truncate">{u.name}</span>
                                                <span className="text-[9px] text-slate-600 font-bold uppercase mt-0.5 truncate">{u.email}</span>
                                                <div className="flex items-center gap-2 mt-3">
                                                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase ${u.role === 'admin' ? 'bg-[#D4AF37] text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                        {u.role}
                                                    </span>
                                                    <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Active</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'health' && (
                            <motion.div key="health" className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { label: 'Application Cluster', status: 'Optimal', icon: Server, health: 100 },
                                        { label: 'Data Registry (Mongo)', status: 'Connected', icon: Database, health: 98 },
                                        { label: 'Intelligence API', status: 'Stable', icon: Activity, health: 100 },
                                    ].map((h, i) => (
                                        <div key={i} className="bg-[#0F172A] border border-white/5 p-10 rounded-[3rem]">
                                            <div className="flex justify-between items-start mb-8">
                                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#F3CA3E]"><h.icon size={24} /></div>
                                                <span className="text-emerald-500 text-[9px] font-black uppercase tracking-widest bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">Online</span>
                                            </div>
                                            <h3 className="text-white font-black text-xs uppercase tracking-widest mb-2">{h.label}</h3>
                                            <div className="flex items-end gap-4 mb-4">
                                                <span className="text-3xl font-black text-white italic">{h.health}%</span>
                                                <span className="text-[10px] text-slate-600 font-bold uppercase mb-1">Response Stability</span>
                                            </div>
                                            <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                                <motion.div initial={{ width: 0 }} animate={{ width: `${h.health}%` }} className="h-full bg-[#D4AF37] shadow-[0_0_10px_rgba(30,64,175,0.5)]"></motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'analytics' && (
                            <div className="flex items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-[4rem]">
                                <div className="text-center">
                                    <BarChart3 size={48} className="mx-auto text-[#D4AF37]/20 mb-4" />
                                    <h2 className="text-xl font-black text-slate-500 uppercase tracking-widest italic">Traffic Neural Map</h2>
                                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-2">Integrating Real-time Visualization Engine...</p>
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
            
            {/* Custom CSS for scrollbar */}
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(30,64,175,0.2); }
            `}} />
        </div>
    );
};

export default AdminDashboard;
