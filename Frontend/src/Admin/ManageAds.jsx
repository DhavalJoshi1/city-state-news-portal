import React from 'react';
import { Layout, MousePointer2, Eye, DollarSign, Calendar } from 'lucide-react';

const AdSlot = ({ title, client, status, clicks, expiry }) => (
  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
        <Layout size={20} />
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        {status}
      </span>
    </div>
    <h3 className="font-bold text-gray-800">{title}</h3>
    <p className="text-xs text-gray-500 mb-4">Client: {client}</p>
    
    <div className="grid grid-cols-2 gap-4 border-t pt-4">
      <div>
        <div className="flex items-center gap-1 text-gray-400 text-[10px]"><Eye size={12}/> Views</div>
        <div className="font-bold text-sm">45.2k</div>
      </div>
      <div>
        <div className="flex items-center gap-1 text-gray-400 text-[10px]"><MousePointer2 size={12}/> Clicks</div>
        <div className="font-bold text-sm">1,102</div>
      </div>
    </div>

    <div className="mt-4 flex items-center justify-between text-[10px] font-medium text-gray-400 italic">
      <div className="flex items-center gap-1"><Calendar size={12}/> Expires: {expiry}</div>
      <button className="text-indigo-600 hover:underline">Edit Ad</button>
    </div>
  </div>
);

const ManageAds = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Ad Inventory</h1>
        <div className="flex gap-2">
            <div className="bg-white px-4 py-2 rounded-xl border flex items-center gap-2">
                <DollarSign size={16} className="text-green-500"/>
                <span className="text-sm font-bold">Total Rev: $4,200</span>
            </div>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm hover:bg-[#0B1120] transition">Create New Ad</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AdSlot title="Homepage Sidebar Hero" client="Nike Global" status="Active" clicks="1.2k" expiry="15 May 2026" />
        <AdSlot title="Article Bottom Banner" client="Apple Inc." status="Active" clicks="850" expiry="20 May 2026" />
        <AdSlot title="Popup Newsletter" client="Internal" status="Pending" clicks="0" expiry="N/A" />
      </div>

      <div className="bg-indigo-900 text-white p-8 rounded-3xl relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-xl font-bold mb-2">Ad Space Optimization</h2>
            <p className="text-indigo-200 text-sm max-w-md">Your current ad inventory is 85% full. Consider increasing rates for the Sidebar slots as they have the highest CTR.</p>
        </div>
        <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default ManageAds;