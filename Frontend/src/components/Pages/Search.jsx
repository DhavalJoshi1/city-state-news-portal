import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../NewsCard'; // Path check karlein
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Search as SearchIcon, Loader2, AlertCircle } from 'lucide-react';

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Updated to use the correct API endpoint with v1 prefix and search param
        const res = await axios.get(`http://localhost:5000/api/v1/news?search=${query}`);
        
        // Response format is { status: 'success', data: { news: [...] } }
        if (res.data && res.data.data && res.data.data.news) {
            setResults(res.data.data.news);
        } else {
            setResults([]);
        }
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-[0.4em] mb-4">
            <SearchIcon size={16} /> Global Search
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase">
            Results for: <span className="text-indigo-500">"{query || '...'}"</span>
          </h1>
          {!loading && (
            <p className="text-slate-500 font-bold mt-4 uppercase tracking-widest text-xs">
              {results.length} stories found in database.
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-indigo-500 mb-6" size={50} />
            <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs">Searching Archives...</p>
          </div>
        ) : (
          <>
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {results.map((news) => (
                  <NewsCard key={news._id || news.id} data={news} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-slate-900/50 rounded-[50px] border border-dashed border-slate-800">
                <div className="bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <AlertCircle className="text-indigo-500" size={40} />
                </div>
                <h2 className="text-3xl font-black text-white mb-4 uppercase italic">No stories found.</h2>
                <p className="text-slate-500 font-medium max-w-md mx-auto italic">
                  Humne database mein dhoonda par kuch nahi mila. Try searching for 'Gujarat', 'Politics' or 'Sports'.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Search;