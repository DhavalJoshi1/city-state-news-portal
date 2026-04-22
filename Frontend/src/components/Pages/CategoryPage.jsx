import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsByCategory } from '../../Services/newsService'; 
import NewsCard from '../../components/NewsCard';
import AdBanner from '../../components/AdBanner';
import { Filter, Grid, List, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const CategoryPage = () => {
  // 1. URL se dynamic category name nikalna
  const { categoryName } = useParams(); 
  
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Latest');
  const [loading, setLoading] = useState(true);

  // 2. Fetch News function
  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      // categoryName URL se aa raha hai (sports, business, tech etc.)
      const data = await getNewsByCategory(categoryName || 'general');
      const articles = Array.isArray(data) ? data : (data.articles || []);
      
      setNews(articles);
      setFilteredNews(articles);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [categoryName]); // Jab bhi category badlegi, data phir se load hoga

  // 3. Filter Logic
  const handleFilter = (filterType) => {
    setActiveFilter(filterType);
    let updatedList = [...news];

    if (filterType === 'Trending') {
      updatedList = news.filter(item => item.title && item.title.length > 35);
    } else if (filterType === 'Analysis') {
      updatedList = news.slice(0, 3); // Example: sirf top 3
    }
    setFilteredNews(updatedList);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-28 space-y-10 min-h-screen">
      
      {/* Header Section: Ye ab dynamic hai */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-indigo-600 font-black tracking-[0.3em] uppercase text-xs">
            City State Coverage
          </span>
          <h1 className="text-7xl font-black text-slate-900 capitalize tracking-tighter">
            {categoryName || 'Politics'}<span className="text-indigo-600">.</span>
          </h1>
          <p className="text-slate-500 mt-4 max-w-lg italic font-medium border-l-4 border-indigo-100 pl-4">
            Exclusive reporting and deep insights into the world of <span className="text-indigo-600 font-bold uppercase">{categoryName || 'General'}</span> news.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 bg-white p-2 rounded-[30px] shadow-sm border border-slate-100">
          {['Latest', 'Trending', 'Analysis', 'Opinion'].map((btn) => (
            <button
              key={btn}
              onClick={() => handleFilter(btn)}
              className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                activeFilter === btn 
                ? 'bg-slate-900 text-white shadow-xl' 
                : 'bg-transparent text-slate-400 hover:text-indigo-600'
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <AdBanner slotId="category-top" />

      {/* Toolbar */}
      <div className="flex justify-between items-center bg-white p-5 rounded-[30px] border border-slate-100 shadow-sm">
        <div className="flex gap-3">
           <button className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner"><Grid size={20}/></button>
           <button className="p-3 text-slate-300 hover:text-slate-600 transition-colors"><List size={20}/></button>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchCategoryData}
            className="p-3 text-slate-400 hover:text-indigo-600 transition-all hover:rotate-180 duration-500"
          >
            <RefreshCw size={20} />
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all">
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="h-96 bg-slate-100 animate-pulse rounded-[40px] border border-slate-200"></div>
          ))
        ) : filteredNews.length > 0 ? (
          filteredNews.map((article, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={article._id || index}
            >
              <NewsCard news={article} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-32 bg-slate-50 rounded-[50px] border-4 border-dashed border-slate-200">
             <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <RefreshCw className="text-slate-300" size={32} />
             </div>
             <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-xl">
               No live stories in <span className="text-indigo-600">{categoryName}</span>
             </p>
             <p className="text-slate-400 mt-2">Please check back later or try another category.</p>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default CategoryPage;