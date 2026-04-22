import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Navigation, CloudSun, Calendar, 
  ChevronRight, Search, Building2, TrendingUp, Wind 
} from "lucide-react";

// Components
import Navbar from "../Navbar"; 
import Footer from "../Footer";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const CityNews = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    const fetchCityNews = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/news?city=${slug}`);
        setNewsList(res.data.data.news || []);
      } catch (error) {
        console.error("Error fetching city news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCityNews();
  }, [slug, API_URL]);

  const displayData = newsList.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        
        {/* --- Header Section --- */}
        <div className="bg-slate-900/50 p-10 md:p-16 rounded-[40px] border border-slate-800 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 text-indigo-500">
            <Building2 size={240} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-[0.4em]">
                <MapPin size={16} /> Hyper-Local Updates
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase italic">
                {slug} <span className="text-indigo-500">Pulse.</span>
              </h1>
              <p className="text-slate-400 font-medium max-w-xl text-lg italic leading-relaxed">
                Get real-time updates on local events and community stories straight from the heart of {slug}.
              </p>
            </div>

            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder={`Search in ${slug}...`} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white"
              />
            </div>
          </div>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* News List */}
          <div className="lg:col-span-2 space-y-10">
            {loading ? (
               <div className="space-y-10">
                 {[1, 2].map(i => (
                    <div key={i} className="animate-pulse bg-slate-900/30 h-60 rounded-[40px] border border-slate-800" />
                 ))}
               </div>
            ) : (
              <AnimatePresence mode="wait">
                {displayData.length > 0 ? (
                  displayData.map((news) => (
                    <motion.div 
                      key={news._id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => navigate(`/news/${news.slug || news._id}`)}
                      className="group bg-slate-900/30 rounded-[40px] p-8 border border-slate-800 hover:bg-slate-800/40 transition-all flex flex-col md:flex-row gap-10 cursor-pointer"
                    >
                      <div className="w-full md:w-80 h-60 rounded-[30px] overflow-hidden flex-shrink-0">
                        <img 
                          src={news.image ? (news.image.startsWith('http') ? news.image : `http://localhost:5000/${news.image.replace(/\\/g, '/').replace(/^public\//, '')}`) : "https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=800"} 
                          alt={news.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-5">
                          <span className="bg-indigo-600/20 text-indigo-400 text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest">
                            {news.category?.name || "General"}
                          </span>
                          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Calendar size={14} /> {new Date(news.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-3xl font-black mb-4 leading-tight group-hover:text-indigo-400 transition-colors">
                          {news.title}
                        </h3>
                        <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-8 leading-relaxed italic">
                          {news.summary || "Latest local updates..."}
                        </p>
                        <button className="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
                          Read Full Story <ChevronRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-20 bg-slate-900/50 rounded-[40px] border border-dashed border-slate-800">
                    <p className="text-slate-500 font-bold uppercase tracking-widest">No stories found in {slug}</p>
                  </div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* City Pulse Sidebar */}
          <div className="space-y-10">
            <div className="bg-indigo-600 rounded-[40px] p-10 shadow-2xl shadow-indigo-600/10 relative overflow-hidden group">
               <TrendingUp className="absolute -bottom-10 -right-10 opacity-20 text-white" size={200} />
               <h4 className="text-2xl font-black mb-10 flex items-center gap-3 italic uppercase tracking-tighter">
                 <Navigation size={24} className="animate-pulse" /> City Pulse
               </h4>
               <div className="space-y-10 relative z-10">
                  <div className="border-b border-white/10 pb-6">
                    <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest mb-1">Local Events</p>
                    <p className="text-4xl font-black">12 Today</p>
                  </div>
                  <div className="border-b border-white/10 pb-6">
                    <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest mb-1">Traffic Alert</p>
                    <p className="text-4xl font-black flex items-center gap-3">Moderate <Wind size={24} className="text-indigo-200" /></p>
                  </div>
                  <div>
                    <p className="text-indigo-200 text-[10px] font-black uppercase tracking-widest mb-1">AQI Level</p>
                    <p className="text-4xl font-black">74 <span className="text-sm opacity-60">Good</span></p>
                  </div>
               </div>
            </div>

            {/* Advertise Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 text-center">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Promoted</p>
              <h5 className="text-xl font-black mb-8 italic leading-snug">Connect with {slug}'s local audience.</h5>
              <button className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-xl">
                Post Your Ad
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CityNews;