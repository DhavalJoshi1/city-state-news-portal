import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Navbar';
import { 
  FileText, Plus, Edit3, Trash2, Clock, CheckCircle, 
  XCircle, BarChart3, Eye, MessageCircle, TrendingUp, 
  ChevronRight, Layout, PenTool, Flame, RefreshCw,
  Sparkles, DollarSign, Target, CreditCard, Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const JournalistDashboard = () => {
    const { token, user, logout } = useAuth();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('pipeline');
    const [stats, setStats] = useState({
        totalViews: '32.8k',
        engagement: '14.2%',
        trendingStories: 3,
        accumulatedPennies: '142.50'
    });

    const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

    const fetchMyNews = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/news/my-news`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNews(res.data.data.news || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching your news:", error);
            if (error.response?.status === 401) logout();
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) fetchMyNews();
    }, [token]);

    const handleDelete = async (id) => {
        if (!window.confirm("Archive this story permanently?")) return;
        try {
            await axios.delete(`${API_URL}/news/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNews(news.filter(item => item._id !== id));
        } catch (error) {
            console.error("Error deleting news:", error);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#060B19] flex items-center justify-center">
            <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-16 h-16 bg-[#D4AF37]/10 rounded-[2rem] border border-[#D4AF37]/30 flex items-center justify-center"
            >
                <PenTool className="text-[#F3CA3E]" size={32} />
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#060B19] text-slate-300 font-sans selection:bg-[#D4AF37] selection:text-white">
            <Navbar />
            
            <main className="max-w-[1440px] mx-auto px-6 pt-32 pb-20">
                
                {/* --- Premium Header Section --- */}
                <div className="relative mb-20 p-12 bg-gradient-to-br from-[#0a0a0a] to-[#050505] rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-60"></div>
                    
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 relative z-10">
                        <div className="max-w-2xl">
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 mb-8"
                            >
                                <div className="p-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl">
                                    <Sparkles className="text-[#F3CA3E]" size={18} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">Journalist Intelligence Hub</span>
                            </motion.div>
                            
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-6xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase italic"
                            >
                                Forge <span className="text-[#D4AF37]">Intel.</span>
                            </motion.h1>
                            
                            <motion.p 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-slate-500 mt-8 text-xl font-medium"
                            >
                                Welcome back, Operative <span className="text-white">{user?.name?.split(' ')[0]}</span>. Your dispatch network has delivered <span className="text-[#FDE047] font-black">{stats.totalViews}</span> impressions in the last cycle.
                            </motion.p>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="bg-[#0B1120]/60 border border-[#D4AF37]/20 px-8 py-6 rounded-[2.5rem] flex items-center gap-10 backdrop-blur-xl group hover:border-blue-500 transition-all">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-1">Impact Tier</span>
                                    <span className="text-3xl font-black text-white italic tracking-tighter">ELITE V.</span>
                                </div>
                                <div className="w-16 h-16 bg-gradient-to-br from-[#B8860B] to-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(30,64,175,0.4)] group-hover:scale-110 transition-transform">
                                    <Flame size={32} />
                                </div>
                            </div>
                            <Link 
                                to="/submit-news" 
                                className="group bg-[#D4AF37] hover:bg-[#F3CA3E] text-white w-24 h-24 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-[#8B6508]/40 transition-all transform hover:scale-105 active:scale-95"
                            >
                                <Plus size={40} className="group-hover:rotate-90 transition-transform duration-500" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* --- Feature Tabs (Extra Servicing) --- */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {[
                        { id: 'pipeline', label: 'News Pipeline', icon: Layout },
                        { id: 'analytics', label: 'Engagement Stats', icon: TrendingUp },
                        { id: 'monetization', label: 'Earning Cloud', icon: DollarSign },
                        { id: 'tools', label: 'Writing Assistant', icon: Target }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveSection(tab.id)}
                            className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-3 transition-all ${activeSection === tab.id ? 'bg-[#D4AF37] text-white shadow-xl shadow-[#8B6508]/40' : 'bg-[#0F172A] text-slate-500 hover:bg-white/5 border border-white/5'}`}
                        >
                            <tab.icon size={16} /> {tab.label}
                        </button>
                    ))}
                    <button className="ml-auto p-3.5 bg-white/5 rounded-2xl text-slate-500 hover:text-[#FDE047] transition-colors" onClick={fetchMyNews}><RefreshCw size={20} /></button>
                </div>

                {/* --- Conditional Sections --- */}
                <AnimatePresence mode="wait">
                    {activeSection === 'pipeline' && (
                        <motion.div 
                            key="pipeline"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                        >
                            {news.length > 0 ? (
                                news.map((item, i) => (
                                    <motion.div 
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={item._id} 
                                        className="bg-[#0F172A] border border-white/5 rounded-[3.5rem] overflow-hidden group hover:border-[#D4AF37]/30 transition-all flex flex-col h-full shadow-lg"
                                    >
                                        <div className="h-72 overflow-hidden relative">
                                            <img 
                                                src={item.image ? (item.image.startsWith('http') ? item.image : `http://localhost:5000/${item.image.replace(/\\/g, '/')}`) : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800'} 
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-all duration-700 grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                            <div className="absolute top-8 right-8">
                                                <span className={`px-5 py-2.5 rounded-[1.2rem] text-[9px] font-black uppercase tracking-widest flex items-center gap-3 backdrop-blur-2xl border ${
                                                    item.status === 'published' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 
                                                    item.status === 'pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                                                    'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                                }`}>
                                                    <div className={`w-2 h-2 rounded-full ${item.status === 'published' ? 'bg-emerald-400 animate-pulse' : item.status === 'pending' ? 'bg-amber-400' : 'bg-rose-400'}`}></div>
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-12 flex-grow flex flex-col">
                                            <div className="flex items-center gap-4 mb-6">
                                                <span className="text-[#F3CA3E] text-[10px] font-black uppercase tracking-[0.3em]">{item.category?.name || 'GLOBAL'}</span>
                                                <div className="h-3 w-px bg-white/5"></div>
                                                <span className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">{new Date(item.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <h3 className="text-3xl font-black text-white mb-10 line-clamp-2 leading-[1.1] uppercase italic tracking-tighter group-hover:text-[#FDE047] transition-colors">
                                                {item.title}
                                            </h3>
                                            
                                            <div className="mt-auto pt-10 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex items-center gap-10">
                                                    <div className="flex items-center gap-2.5 text-slate-500 group-hover:text-white transition-colors">
                                                        <Eye size={18} className="text-[#D4AF37]/50" /> <span className="text-xs font-black tracking-tighter italic">12.8k</span>
                                                    </div>
                                                    <div className="flex items-center gap-2.5 text-slate-500 group-hover:text-white transition-colors">
                                                        <MessageCircle size={18} className="text-[#D4AF37]/50" /> <span className="text-xs font-black tracking-tighter italic">24</span>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <Link 
                                                        to={`/edit-news/${item._id}`} 
                                                        className="p-4 bg-white/5 hover:bg-[#D4AF37] text-slate-500 hover:text-white rounded-2xl transition-all shadow-xl"
                                                    >
                                                        <Edit3 size={18} />
                                                    </Link>
                                                    <button 
                                                        onClick={() => handleDelete(item._id)}
                                                        className="p-4 bg-white/5 hover:bg-rose-600 text-slate-500 hover:text-white rounded-2xl transition-all shadow-xl"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full py-48 text-center bg-[#0F172A] border-2 border-dashed border-white/5 rounded-[5rem] shadow-inner">
                                    <FileText size={64} className="mx-auto text-slate-800 mb-8 opacity-20" />
                                    <h2 className="text-3xl font-black text-slate-700 uppercase tracking-widest italic">Sector Clear.</h2>
                                    <p className="text-slate-800 text-sm mt-6 font-bold max-w-sm mx-auto uppercase tracking-tighter italic">No active dispatch intel in your current pipeline.</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeSection === 'monetization' && (
                        <motion.div key="monetization" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                             {[
                                { label: 'Accumulated Intel Credits', value: `$${stats.accumulatedPennies}`, icon: CreditCard, color: 'emerald' },
                                { label: 'Dispatch Bounty (Avg)', value: '$12.40', icon: DollarSign, color: 'blue' },
                                { label: 'Next Payout Cycle', value: '4 Days', icon: Clock, color: 'amber' },
                                { label: 'Network Multiplier', value: '1.4x', icon: Target, color: 'indigo' }
                            ].map((card, i) => (
                                <div key={i} className="bg-[#0F172A] border border-white/5 p-12 rounded-[3.5rem] hover:border-emerald-500/20 transition-all shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-5"><card.icon size={100} /></div>
                                    <div className={`w-14 h-14 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center text-${card.color}-500 mb-8 group-hover:scale-110 transition-transform`}><card.icon size={24} /></div>
                                    <h3 className="text-4xl font-black text-white italic tracking-tighter mb-2">{card.value}</h3>
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{card.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {activeSection === 'analytics' && (
                        <div className="bg-[#0F172A] border border-white/5 p-20 rounded-[4rem] text-center shadow-2xl">
                            <TrendingUp size={64} className="mx-auto text-[#D4AF37]/10 mb-8" />
                            <h2 className="text-3xl font-black text-white italic uppercase tracking-widest mb-4">Engagement Neural Map</h2>
                            <p className="text-slate-600 font-bold uppercase tracking-widest text-xs max-w-md mx-auto">Calibrating traffic telemetry and reader heatmaps. Real-time data sync in progress...</p>
                        </div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default JournalistDashboard;
