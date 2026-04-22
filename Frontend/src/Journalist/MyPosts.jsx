import React, { useState } from 'react';
import { Edit3, Trash2, ExternalLink, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const MyPosts = () => {
  // Dummy Data (Baad mein ise API se replace karenge)
  const [posts] = useState([
    {
      id: 1,
      title: "New Smart City Project Launched in Ahmedabad",
      date: "08 April 2026",
      status: "Live",
      views: "1.2k",
      category: "City News"
    },
    {
      id: 2,
      title: "Local Tech Summit 2026: What to Expect",
      date: "07 April 2026",
      status: "Pending",
      views: "0",
      category: "Technology"
    },
    {
      id: 3,
      title: "State Government Announces New Education Policy",
      date: "05 April 2026",
      status: "Rejected",
      views: "0",
      category: "State News"
    }
  ]);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Live': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-slate-900">My Published Stories</h1>
          <p className="text-slate-500 text-sm font-medium">Manage and track your reporting performance</p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] shadow-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Article Details</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Category</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Views</th>
                <th className="px-6 py-5 text-xs font-black uppercase tracking-widest text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <motion.tr 
                  key={post.id}
                  whileHover={{ backgroundColor: '#f8fafc' }}
                  className="transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-slate-900 font-bold line-clamp-1 mb-1">{post.title}</span>
                      <span className="text-slate-400 text-xs font-medium">{post.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-slate-600 text-sm font-bold bg-slate-100 px-3 py-1 rounded-lg">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold ${getStatusStyle(post.status)}`}>
                      {post.status === 'Live' && <CheckCircle size={14} />}
                      {post.status === 'Pending' && <Clock size={14} />}
                      {post.status === 'Rejected' && <AlertCircle size={14} />}
                      {post.status}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-600 font-black text-sm">
                    {post.views}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Edit Post">
                        <Edit3 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete Post">
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all" title="View Live">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State Logic */}
        {posts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-bold uppercase tracking-widest">No articles found. Start writing!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPosts;
