import React, { useState } from 'react';
import axios from 'axios';
import { Send, ImageIcon, Type, Layout, Tag, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const CreatePost = () => {
  // ✅ State initialization
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Politics',
    image: '',
    author: 'Admin'
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend API call
      await axios.post('http://localhost:5000/api/news', formData);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000); 
      setFormData({ title: '', content: '', category: 'Politics', image: '', author: 'Admin' });
    } catch (err) {
      console.error("Post karne mein error:", err);
      alert("Error: Kya backend server chalu hai?");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-4xl font-black text-slate-900 mb-2 italic">Create News Story</h2>
        <p className="text-slate-500 mb-10 font-medium">Draft a new article for the City State portal.</p>

        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-600 rounded-2xl flex items-center gap-3 font-bold animate-bounce">
            <CheckCircle size={20} /> Story Published Successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-8 rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/50">
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Type size={14} /> Headline
              </label>
              <input 
                type="text"
                className="w-full p-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold"
                placeholder="What's happening?"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Tag size={14} /> Category
              </label>
              <select 
                className="w-full p-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option>Politics</option>
                <option>Business</option>
                <option>Technology</option>
                <option>Sports</option>
                <option>Crime</option>
                <option>Weather</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <ImageIcon size={14} /> Cover Image URL
              </label>
              <input 
                type="text"
                className="w-full p-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                placeholder="Paste link (Unsplash, etc.)"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            <div className="space-y-2 flex-grow">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                <Layout size={14} /> Story Details
              </label>
              <textarea 
                className="w-full p-4 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium h-full min-h-[200px]"
                placeholder="Start writing the full story..."
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100"
            >
              Publish Post <Send size={18} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;