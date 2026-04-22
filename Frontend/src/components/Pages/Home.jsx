import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Zap, Loader2 } from 'lucide-react';
import axios from 'axios';
import TrendingSidebar from '../TrendingSidebar';

const Home = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${API_URL}/news`);
        // The API returns { success: true, message: '...', data: { news: [...] } }
        setNewsList(res.data.data.news || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [API_URL]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 2); 
  };


  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <div className="max-w-[1440px] mx-auto px-6 pt-10">
        
        {/* --- ADVERTISEMENT SPACE --- */}
        <div className="w-full h-40 rounded-[40px] mb-12 flex flex-col items-center justify-center border border-[#1e40af]/30 shadow-lg relative overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1440&h=160" 
            alt="City State Ad Partner" 
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-transform duration-700 hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="z-10 text-center">
            <span className="text-[10px] font-black text-slate-300 tracking-[0.4em] uppercase py-1 px-3 border border-[#1e3a8a]/30 rounded-lg">
              AD PARTNER
            </span>
          </div>
        </div>

        {/* --- DYNAMIC NEWS TICKER --- */}
        <div className="w-full bg-[#1e40af]/10 border border-[#1e40af]/30 rounded-full py-3 px-6 mb-12 flex items-center overflow-hidden">
          <div className="bg-[#1e40af] px-4 py-1.5 rounded-full mr-6 flex items-center gap-2 shrink-0">
            <Zap size={16} className="text-black fill-black" />
            <span className="text-black font-black text-[10px] uppercase tracking-tighter">Running News</span>
          </div>
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {newsList.length > 0 ? newsList.map(news => (
               <span key={news._id} className="text-sm font-bold text-gray-300 hover:text-indigo-400 cursor-pointer transition-colors">
                 {news.title} •
               </span>
            )) : (
              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest italic">
                Scanning the state for latest updates... Stay tuned...
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* --- MAIN CONTENT --- */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-4xl font-black italic tracking-tighter uppercase">
                <span className="text-blue-700 mr-2">|</span> Latest Stories
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                <span className="text-[10px] font-black text-[#1e40af] uppercase tracking-widest">Live Now</span>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white/5 rounded-[40px] h-64 mb-6" />
                    <div className="h-6 bg-white/10 rounded-full w-3/4 mb-4" />
                    <div className="h-4 bg-white/5 rounded-full w-1/4" />
                  </div>
                ))}
              </div>
            ) : newsList.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-[40px] border border-dashed border-white/10">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No news found in the archive.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {newsList.slice(0, visibleCount).map((news) => (
                  <motion.div 
                    key={news._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    onClick={() => navigate(`/news/${news.slug || news._id}`)}
                    className="cursor-pointer group"
                  >
                    <div className="relative rounded-[40px] overflow-hidden mb-6 h-64 border border-white/5">
                      <img 
                        src={news.image ? (news.image.startsWith('http') ? news.image : `http://localhost:5000/${news.image.replace(/\\/g, '/').replace(/^public\//, '')}`) : "https://images.unsplash.com/photo-1504711432869-efd297920786?auto=format&fit=crop&q=80&w=800"} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        alt={news.title} 
                      />
                      <div className="absolute top-6 left-6">
                        <span className="bg-[#1e40af] text-black text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest">
                          {news.category?.name || "General"}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black text-white leading-tight mb-4 group-hover:text-[#1e40af] transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold">
                      <Clock size={14} /> {new Date(news.createdAt).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* --- LOAD MORE STORIES BUTTON --- */}
            {!loading && visibleCount < newsList.length && (
              <div className="mt-16 flex justify-center border-t border-white/5 pt-10">
                <button 
                  onClick={handleLoadMore}
                  className="group flex items-center gap-4 text-[#1e40af] text-[11px] font-black uppercase tracking-[0.4em] hover:text-white transition-all"
                >
                  Load More Stories <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:w-[400px]">
            <TrendingSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;