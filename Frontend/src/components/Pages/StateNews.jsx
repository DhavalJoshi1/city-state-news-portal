import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, Zap, Landmark, ArrowRight, 
  Filter, MapPin, Search, Calendar 
} from "lucide-react";

// Components
import Navbar from "../Navbar"; 
import Footer from "../Footer";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

const StateNews = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    const fetchStateNews = async () => {
      try {
        setLoading(true);
        // Using common getNews with state filter
        const res = await axios.get(`${API_URL}/news?state=${slug}`);
        setNewsList(res.data.data.news || []);
      } catch (error) {
        console.error("Error fetching state news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStateNews();
  }, [slug, API_URL]);

  // Filtering Logic
  const filteredNews = newsList.filter(news => 
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Total Reports", value: "12.4k", icon: Globe, color: "text-blue-400" },
    { label: "Live Updates", value: "142", icon: Zap, color: "text-amber-400" },
    { label: "Districts", value: "33", icon: MapPin, color: "text-emerald-400" },
  ];

  const handleNewsClick = (news) => {
    navigate(`/news/${news.id}`, { state: news });
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        
        {/* Search & Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-[0.4em] mb-6">
              <Landmark size={18} /> Regional Coverage
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase italic">
              {slug} <span className="text-indigo-500">News.</span>
            </h1>
            <p className="text-slate-400 mt-8 font-medium text-xl leading-relaxed max-w-2xl italic">
              Comprehensive news coverage from the state of {slug}, bringing you stories that impact your community.
            </p>
          </motion.div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder={`Search ${slug} news...`}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-14 pr-6 font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white"
              />
            </div>
          </div>
        </div>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 p-10 rounded-[40px] border border-slate-800 flex items-center gap-8 group hover:bg-indigo-600 transition-all duration-500"
            >
              <div className={`p-5 rounded-3xl bg-slate-800 group-hover:bg-white transition-all ${stat.color}`}>
                <stat.icon size={36} className="group-hover:text-indigo-600 transition-colors" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-indigo-200">{stat.label}</p>
                <p className="text-4xl font-black group-hover:text-white leading-none mt-2">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- Dynamic News Grid --- */}
        <div className="space-y-12">
          <div className="flex items-center justify-between border-b border-slate-800 pb-8">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">Latest from {slug}</h2>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse bg-slate-900/40 h-[450px] rounded-[50px] border border-slate-800" />
                ))}
             </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
            >
              <AnimatePresence mode="wait">
                {filteredNews.length > 0 ? (
                  filteredNews.map((news) => (
                    <motion.div
                      key={news._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      onClick={() => navigate(`/news/${news.slug || news._id}`)}
                      className="group cursor-pointer bg-slate-900/30 rounded-[50px] overflow-hidden border border-slate-800 hover:bg-slate-800/40 transition-all duration-500"
                    >
                      {/* Image */}
                      <div className="h-72 relative overflow-hidden">
                        <img 
                          src={news.image ? (news.image.startsWith('http') ? news.image : `http://localhost:5000/${news.image.replace(/\\/g, '/').replace(/^public\//, '')}`) : "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800"} 
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-8 left-8">
                          <span className="bg-indigo-600 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-2xl">
                             {news.city?.name || news.city?.state || slug}
                          </span>
                        </div>
                      </div>

                      <div className="p-10">
                        <div className="flex items-center gap-3 mb-6 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                          <Calendar size={14} className="text-indigo-500" />
                          <span>{new Date(news.createdAt).toLocaleDateString()}</span>
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                          <span className="text-indigo-400 italic">{news.category?.name || "News"}</span>
                        </div>
                        
                        <h3 className="text-2xl font-black group-hover:text-indigo-400 transition-colors mb-6 leading-tight line-clamp-2">
                          {news.title}
                        </h3>
                        
                        <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-10 leading-relaxed italic">
                          {news.summary || "Latest regional updates..."}
                        </p>
                        
                        <div className="flex items-center justify-between pt-8 border-t border-slate-800">
                           <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Read Report</span>
                           <div className="w-12 h-12 rounded-full bg-slate-800 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-all shadow-xl group-hover:translate-x-2">
                              <ArrowRight size={20} />
                           </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-24 bg-slate-900/40 rounded-[50px] border border-dashed border-slate-800">
                     <p className="text-slate-500 font-black uppercase tracking-[0.3em] text-xs">No reports found for {slug}.</p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StateNews;