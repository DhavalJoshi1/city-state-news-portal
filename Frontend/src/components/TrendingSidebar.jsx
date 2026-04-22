import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, ArrowRight } from 'lucide-react';

const TrendingSidebar = () => {
  const navigate = useNavigate();

  // Story click handle karne ke liye function
  const handleStoryClick = (story) => {
    // Navigate ke saath state pass karna achhi practice hai
    navigate(`/news/${story.id}`, { state: { ...story, cat: story.category, img: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=800" } });
    window.scrollTo(0, 0); // Click karte hi page upar jaye
  };

  const trendingStories = [
    { id: 101, category: "POLITICS", title: "City Council announces new infrastructure budget for 2026" },
    { id: 102, category: "SPORTS", title: "Local sports team wins regional championship in thrilling final" },
    { id: 103, category: "BUSINESS", title: "New tech hub to open in the downtown area, creating 500 jobs" },
    { id: 104, category: "TECHNOLOGY", title: "Major software update released to fix critical security flaws" }
  ];

  return (
    <div className="bg-black rounded-[40px] p-8 border border-[#1e3a8a]/20 sticky top-28 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-12">
        <div className="bg-gradient-to-br from-[#1e40af] to-blue-500 p-2.5 rounded-2xl shadow-lg shadow-blue-900/20">
          <TrendingUp size={22} className="text-black" />
        </div>
        <h3 className="text-2xl font-black italic text-[#1e40af] uppercase tracking-tighter leading-none">
          Trending <br/> <span className="text-[12px] tracking-[0.3em] opacity-50 not-italic">Stories</span>
        </h3>
      </div>

      {/* Stories List */}
      <div className="space-y-10">
        {trendingStories.map((story, index) => (
          <div 
            key={story.id} 
            onClick={() => handleStoryClick(story)}
            className="group cursor-pointer flex gap-5 items-start relative"
          >
            {/* Index Number */}
            <span className="text-4xl font-black text-[#1e3a8a]/10 group-hover:text-[#1e40af]/30 transition-all duration-500 leading-none">
              0{index + 1}
            </span>
            
            <div className="flex-1">
              <span className="text-[9px] font-black text-[#1e40af] tracking-[0.3em] uppercase mb-2 block group-hover:translate-x-1 transition-transform">
                {story.category}
              </span>
              <h4 className="text-[16px] font-bold text-gray-400 leading-snug group-hover:text-white transition-all duration-300">
                {story.title}
              </h4>
              {/* Hover Line Effect */}
              <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-[#1e40af] to-transparent mt-3 transition-all duration-500 opacity-30"></div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button 
        onClick={() => {
          navigate('/trending');
          window.scrollTo(0, 0);
        }}
        className="w-full mt-12 py-5 border border-[#1e3a8a]/30 rounded-3xl text-[10px] font-black uppercase tracking-[0.4em] text-[#1e40af] bg-[#0a0a0a] hover:bg-[#1e40af] hover:text-black hover:border-[#1e40af] transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 shadow-lg"
      >
        View All Trending <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default TrendingSidebar;