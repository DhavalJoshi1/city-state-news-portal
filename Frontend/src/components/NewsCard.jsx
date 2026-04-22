import React from 'react';
import { Bookmark, Share2, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const NewsCard = ({ data }) => {
  const navigate = useNavigate();

  // Description truncate helper
  const truncateDescription = (text, limit) => {
    if (!text) return "Read the full story on our portal...";
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  const handleCardClick = () => {
    // Navigate with full data so NewsDetail doesn't have to fetch again
    navigate(`/news/${data?._id || data?.id}`, { state: data });
  };

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      onClick={handleCardClick}
      className="bg-slate-900/40 border border-slate-800 rounded-[40px] overflow-hidden group h-full flex flex-col hover:bg-slate-800/60 transition-all duration-500 cursor-pointer relative"
    >
      {/* --- News Image --- */}
      <div className="relative h-60 overflow-hidden">
        <img 
          src={data?.image ? (data.image.startsWith('http') ? data.image : `http://localhost:5000/${data.image.replace(/\\/g, '/')}`) : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800'} 
          alt={data?.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-lg uppercase tracking-widest shadow-2xl">
            {data?.category || data?.cat || 'Trending'}
          </span>
        </div>
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* --- Content Body --- */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">
          <Clock size={14} className="text-indigo-500" /> 
          {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : (data?.date || 'Today')} • 4 min read
        </div>

        <h3 className="text-xl font-black leading-tight text-white group-hover:text-indigo-400 transition-colors mb-4 italic uppercase tracking-tighter">
          {data?.title || 'Untitled Story'}
        </h3>

        <p className="text-slate-400 text-sm font-medium italic line-clamp-2 mb-8 flex-grow leading-relaxed">
          {truncateDescription(data?.content || data?.desc, 110)}
        </p>

        {/* --- Footer --- */}
        <div className="flex justify-between items-center border-t border-slate-800/50 pt-6 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-black text-indigo-400 uppercase">
              {data?.author?.name ? data.author.name.charAt(0) : 'A'}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-wider">
                {data?.author?.name || 'Editorial'}
              </span>
              <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Verified Reporter</span>
            </div>
          </div>

          <div className="flex gap-4 text-slate-500">
            <Bookmark size={18} className="hover:text-indigo-400 cursor-pointer transition-colors" />
            <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-all">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;