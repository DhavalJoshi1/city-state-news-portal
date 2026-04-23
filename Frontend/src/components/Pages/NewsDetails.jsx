import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Share2, Calendar, User, MessageCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const NewsDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [news, setNews] = useState(location.state || null);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  useEffect(() => {
    window.scrollTo(0, 0);

    // Agar news state mein nahi hai (direct URL access), toh API se fetch karein
    if (!news) {
      const fetchSingleNews = async () => {
        try {
          const res = await axios.get(`${API_URL}/news/post/${id}`);
          setNews(res.data.data.news);
        } catch (err) {
          console.error("Error fetching single news:", err);
          setError(true);
        } finally {
          setLoading(false);
        }
      };
      fetchSingleNews();
    }
  }, [id, news, API_URL]);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
       <Loader2 className="text-indigo-500 animate-spin" size={40} />
    </div>
  );

  if (error || !news) return (
    <div className="min-h-screen bg-[#0f172a] text-indigo-500 flex flex-col items-center justify-center font-black italic uppercase">
      <h1 className="text-4xl mb-4 tracking-tighter text-white">NEWS NOT <span className="text-indigo-600">FOUND</span></h1>
      <button onClick={() => navigate('/')} className="text-xs tracking-[0.3em] border-b border-indigo-500 pb-1">Back to Home</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        {/* --- NAVIGATION --- */}
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-3 text-indigo-400 hover:text-white transition-all mb-12"
        >
          <div className="p-2 rounded-full border border-slate-800 group-hover:border-indigo-500 bg-slate-900/50">
            <ArrowLeft size={20} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Return to Feed</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* --- LEFT CONTENT (Col 8) --- */}
          <div className="lg:col-span-8">
            <span className="bg-indigo-600 text-white text-[10px] font-black px-6 py-2 rounded-lg uppercase tracking-widest shadow-xl">
              {news.category?.name || "General"}
            </span>
            
            <h1 className="text-5xl md:text-7xl font-black mt-10 leading-[0.95] italic uppercase tracking-tighter text-white">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 mt-10 pb-10 border-b border-slate-800/50">
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <User size={14} className="text-indigo-500" /> {news.createdBy?.name || "Editorial Desk"}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <Calendar size={14} className="text-indigo-500" /> {new Date(news.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                <Clock size={14} className="text-indigo-500" /> {Math.ceil(news.content?.length / 500) || 5} Min Read
              </div>
            </div>

            {/* MAIN IMAGE */}
            <div className="mt-12 rounded-[40px] overflow-hidden border border-slate-800 h-[400px] md:h-[550px] shadow-2xl">
              <img 
                src={news.image ? (news.image.startsWith('http') ? news.image : `http://localhost:5000/${news.image.replace(/\\/g, '/').replace(/^public\//, '')}`) : "https://images.unsplash.com/photo-1504711432869-efd297920786?auto=format&fit=crop&q=80&w=800"} 
                alt={news.title} 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* ARTICLE BODY */}
            <div className="mt-16 space-y-8">
              <p className="text-indigo-400 text-2xl font-black italic leading-relaxed uppercase tracking-tight border-l-4 border-indigo-600 pl-8">
                "{news.summary || "Latest updates from the state capital."}"
              </p>
              
              <div className="text-slate-400 text-lg md:text-xl leading-[1.8] font-medium space-y-6">
                <div dangerouslySetInnerHTML={{ __html: news.content }} />
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDEBAR (Col 4) --- */}
          <div className="lg:col-span-4 space-y-10">
            {/* Share & Actions */}
            <div className="bg-slate-900/50 border border-slate-800 p-10 rounded-[40px]">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-8">Spread the News</h4>
              <div className="flex gap-4">
                <button className="flex-1 bg-indigo-600 hover:bg-white hover:text-black py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
                  <Share2 size={16} /> Share
                </button>
                <button className="p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all">
                  <MessageCircle size={20} />
                </button>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-indigo-600 p-10 rounded-[40px] shadow-2xl shadow-indigo-600/20">
               <h4 className="text-2xl font-black italic uppercase mb-4 leading-none text-white">Get Alerts.</h4>
               <p className="text-indigo-200 text-sm mb-8 font-medium italic">Never miss a major update from your city.</p>
               <input 
                 type="email" 
                 placeholder="Enter email address..." 
                 className="w-full bg-white/10 border border-white/20 rounded-2xl p-5 text-sm mb-4 outline-none focus:ring-2 focus:ring-white/50 text-white placeholder:text-indigo-300" 
               />
               <button className="w-full bg-white text-indigo-600 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0B1120] hover:text-white transition-all shadow-xl">
                 Subscribe Now
               </button>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsDetail;