import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsGrid = () => {
  const [news, setNews] = useState([]);

  // Dummy data backup: Agar API kaam na kare toh ye dikhega
  const dummyNews = [
    {
      _id: '1',
      title: "Breaking: Major Development Unveiled for Downtown City Square",
      description: "New plans for a high-rise office tower and public park were revealed today by the city council, signaling a significant investment.",
      category: "URBAN DEVELOPMENT",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000"
    },
    {
      _id: '2',
      title: "Community Rally: Local Voices Demand Funding for New Recreation Center",
      description: "Hundreds gathered at City Hall to advocate for a dedicated recreation center, citing the need for accessible community spaces.",
      category: "COMMUNITY NEWS",
      image: "https://images.unsplash.com/photo-1540910419892-f0c9757f596c?q=80&w=1000"
    },
    {
      _id: '3',
      title: "Tech Innovation: Startup Hub to Open Next Month",
      description: "A new incubator for tech startups is set to open its doors, promising hundreds of new jobs and innovation in the region.",
      category: "TECHNOLOGY",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000"
    },
    {
      _id: '4',
      title: "Gujarat Infrastructure: New Highway Project Approved",
      description: "The state government has given the green light for a massive highway project connecting major industrial zones.",
      category: "GUJARAT NEWS",
      image: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=1000"
    }
  ];

  useEffect(() => {
    const loadNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/v1/news');
        // Agar data backend se aa raha hai
        if (res.data.data && res.data.data.length > 0) {
          setNews(res.data.data);
        } else {
          setNews(dummyNews);
        }
      } catch (err) {
        console.log("Backend not responding, showing dummy data for safety.");
        setNews(dummyNews); // API fail hone par dummy data show hoga
      }
    };
    loadNews();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {news.map((item) => (
        <div 
          key={item._id} 
          className="bg-[#161b2a] border border-slate-800 rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 group shadow-2xl"
        >
          {/* Image Section */}
          <div className="h-64 relative overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
            />
            <div className="absolute top-5 left-5 bg-indigo-600 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-indigo-500/40">
              {item.category}
            </div>
          </div>

          {/* Text Content */}
          <div className="p-8">
            <h3 className="text-2xl font-bold leading-tight text-white group-hover:text-indigo-400 transition-colors">
              {item.title}
            </h3>
            <p className="text-gray-400 text-sm mt-4 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
            
            <div className="mt-8 flex items-center justify-between">
              <button className="text-indigo-500 font-bold text-xs uppercase tracking-widest hover:text-white transition group-hover:underline decoration-2 underline-offset-8">
                Read Story →
              </button>
              <span className="text-[10px] text-gray-600 font-bold">2 MIN READ</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;