import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { 
  TrendingUp, Calendar, ChevronRight, 
  Search, ShieldCheck, Zap, Award, BarChart3 
} from "lucide-react";

import axios from 'axios';
import Navbar from "../Navbar"; 
import Footer from "../Footer";

const CategoryNews = () => {
  const { slug } = useParams(); // Using 'slug' instead of 'categoryName' to match App.jsx
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    const fetchCategoryNews = async () => {
      try {
        setLoading(true);
        // Using the new filter support in getNews
        const res = await axios.get(`${API_URL}/news?category=${slug}`);
        setNewsList(res.data.data.news || []);
      } catch (error) {
        console.error("Error fetching category news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryNews();
  }, [slug, API_URL]);

  // Logic: Filter based on Search
  const displayData = newsList.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />

      <main className="container mx-auto px-6 pt-32 pb-20">
        
        {/* --- Header Section --- */}
        <div className="bg-slate-900/50 p-12 md:p-20 rounded-[50px] border border-slate-800 mb-16 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/5 to-transparent"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">
              {slug} <span className="text-indigo-500">Pulse.</span>
            </h1>
            <p className="text-slate-400 mt-6 text-xl max-w-2xl mx-auto font-medium">
              Top stories and in-depth analysis from the world of {slug}.
            </p>
          </motion.div>

          <div className="mt-12 max-w-xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" />
            <input 
              type="text" 
              placeholder={`Search ${slug} news...`}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-3xl py-5 pl-16 pr-8 font-bold outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            />
          </div>
        </div>

        {/* --- Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-12">
            {loading ? (
              <div className="space-y-12">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse bg-slate-900/20 h-64 rounded-[40px] border border-slate-800" />
                ))}
              </div>
            ) : (
              <AnimatePresence mode="wait">
                {displayData.length > 0 ? (
                  displayData.map((news) => (
                    <motion.div 
                      key={news._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="group bg-slate-900/20 border border-slate-800 rounded-[40px] overflow-hidden flex flex-col md:flex-row hover:bg-slate-800/40 transition-all cursor-pointer"
                      onClick={() => navigate(`/news/${news.slug || news._id}`)}
                    >
                      <div className="md:w-96 h-64 md:h-auto overflow-hidden">
                        <img 
                          src={news.image ? (news.image.startsWith('http') ? news.image : `http://localhost:5000/${news.image.replace(/\\/g, '/')}`) : "https://images.unsplash.com/photo-1504711432869-efd297920786?auto=format&fit=crop&q=80&w=800"} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                          alt={news.title} 
                        />
                      </div>
                      <div className="p-10 flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                          <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest flex items-center gap-2">
                             {news.category?.name || slug}
                          </span>
                          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            <Calendar size={12} /> {new Date(news.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h3 className="text-3xl font-black mb-6 leading-tight group-hover:text-indigo-400 transition-colors">
                          {news.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2 italic">
                          {news.summary || "Latest updates from the world of news..."}
                        </p>
                        <div className="flex items-center gap-2 text-indigo-500 font-black text-xs uppercase tracking-[0.2em] group-hover:gap-4 transition-all">
                          View Full Report <ChevronRight size={18} />
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-32 bg-slate-900/50 rounded-[50px] border-2 border-dashed border-slate-800">
                    <p className="text-slate-500 font-black uppercase tracking-widest">No news found in {slug}.</p>
                  </div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-10">
            <div className="bg-indigo-600 rounded-[40px] p-10">
               <TrendingUp className="text-white mb-6" size={32} />
               <h4 className="text-2xl font-black italic uppercase mb-8">Trending in {slug}</h4>
               <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="border-b border-white/10 pb-4 group cursor-pointer">
                      <p className="text-[10px] font-black text-indigo-200 uppercase mb-2">#Trending_{i}</p>
                      <p className="font-bold text-sm group-hover:underline">Global impact of latest {slug} updates...</p>
                    </div>
                  ))}
               </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryNews;