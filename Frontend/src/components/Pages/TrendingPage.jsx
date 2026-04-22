import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Clock, Share2, Flame } from 'lucide-react';

// Components
import Navbar from '../Navbar';
import Footer from '../Footer';

const TrendingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const trendingNews = [
    { 
      id: 101, 
      category: "POLITICS", // Matching 'category' key used in other pages
      title: "City Council announces new infrastructure budget for 2026", 
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800",
      time: "2 Hours Ago",
      desc: "Detailed report on the city's upcoming infrastructure projects and financial allocation." 
    },
    { 
      id: 102, 
      category: "SPORTS", 
      title: "Local sports team wins regional championship in thrilling final", 
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800",
      time: "4 Hours Ago",
      desc: "A historic victory for the home team after a nail-biting finish in the finals."
    },
    { 
      id: 103, 
      category: "BUSINESS", 
      title: "New tech hub to open in the downtown area, creating 500 jobs", 
      image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800",
      time: "5 Hours Ago",
      desc: "A major boost for the local economy as tech giants invest in the city core."
    },
    { 
      id: 501, 
      category: "GUJARAT", 
      title: "GIFT City expands global footprint with new financial pacts", 
      image: "https://images.unsplash.com/photo-1570160897040-30430ae2a112?q=80&w=800",
      time: "6 Hours Ago",
      desc: "International banks set to open regional headquarters in Gandhinagar."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-6 pt-32 pb-20">
        
        {/* --- BACK BUTTON --- */}
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-3 text-slate-400 hover:text-indigo-400 transition-all mb-12"
        >
          <div className="p-2 rounded-full border border-slate-800 group-hover:border-indigo-500 bg-slate-900/50">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Back to Feed</span>
        </button>

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 border-b border-slate-800 pb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Flame className="text-white" size={24} />
              </div>
              <span className="text-indigo-400 text-xs font-black tracking-[0.4em] uppercase">Live Heatmap</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter uppercase leading-[0.85]">
              Viral <br /> <span className="text-indigo-500">Stories.</span>
            </h1>
          </div>
          <p className="max-w-xs text-slate-500 font-bold text-sm leading-relaxed italic border-l-2 border-indigo-500 pl-6">
            "Real-time analytics of what the city is reading, sharing, and discussing right now."
          </p>
        </div>

        {/* --- TRENDING LIST --- */}
        <div className="space-y-10">
          {trendingNews.map((news, index) => (
            <motion.div 
              key={news.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => navigate(`/news/${news.id}`, { state: news })}
              className="bg-slate-900/30 border border-slate-800 rounded-[50px] p-6 md:p-10 flex flex-col lg:flex-row gap-10 cursor-pointer hover:bg-slate-800/40 transition-all duration-500 group relative overflow-hidden"
            >
              {/* Background Rank Number */}
              <span className="absolute -right-4 -bottom-10 text-[15rem] font-black text-slate-800/20 italic select-none group-hover:text-indigo-500/10 transition-colors">
                0{index + 1}
              </span>

              {/* Image Section */}
              <div className="w-full lg:w-[450px] h-[300px] rounded-[40px] overflow-hidden relative flex-shrink-0 shadow-2xl">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6">
                   <div className="bg-indigo-600 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest flex items-center gap-2">
                     <TrendingUp size={14} /> Trending #{index + 1}
                   </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-center py-4 relative z-10 flex-1">
                <div className="flex items-center gap-6 mb-6">
                  <span className="bg-slate-800 text-indigo-400 text-[10px] font-black tracking-widest uppercase py-2 px-5 rounded-xl border border-slate-700">
                    {news.category}
                  </span>
                  <span className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                    <Clock size={16} className="text-indigo-500" /> {news.time}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black text-white leading-[1] group-hover:text-indigo-400 transition-colors uppercase italic tracking-tighter mb-8">
                  {news.title}
                </h3>

                <p className="text-slate-400 font-medium text-lg leading-relaxed line-clamp-2 italic mb-10 max-w-2xl">
                  {news.desc}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-slate-800/50">
                  <span className="inline-flex items-center gap-3 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] group-hover:gap-5 transition-all">
                    Analyze Report <Share2 size={16} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TrendingPage;