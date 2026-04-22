import React from 'react';
import { Newspaper, Send, Clock } from 'lucide-react';

const JournalistDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-slate-800">Journalist Panel</h1>
        <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all">
          + Write New Story
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <Newspaper className="text-blue-500 mb-4" size={28} />
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">My Articles</h3>
          <p className="text-3xl font-black text-slate-800">12</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <Clock className="text-orange-500 mb-4" size={28} />
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">Pending Approval</h3>
          <p className="text-3xl font-black text-slate-800">2</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <Send className="text-green-500 mb-4" size={28} />
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider">Live Posts</h3>
          <p className="text-3xl font-black text-slate-800">10</p>
        </div>
      </div>
    </div>
  );
};

export default JournalistDashboard;