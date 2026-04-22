import React, { useState } from 'react';
import { Search, Edit3, Trash2, ExternalLink } from 'lucide-react';

const ManageNews = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const data = [
    { id: 1, title: "Web 4.0 Launch in 2026", cat: "Tech", views: "12k", status: "Published" },
    { id: 2, title: "Climate Summit Results", cat: "Politics", views: "8k", status: "Review" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 border-b flex flex-wrap justify-between items-center gap-4">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Filter</button>
            <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg">Export CSV</button>
        </div>
      </div>

      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
          <tr>
            <th className="p-4">Article</th>
            <th className="p-4">Category</th>
            <th className="p-4">Views</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="p-4 font-medium text-gray-800">{item.title}</td>
              <td className="p-4"><span className="text-xs bg-gray-100 px-2 py-1 rounded-md">{item.cat}</span></td>
              <td className="p-4 text-sm text-gray-600">{item.views}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${item.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {item.status}
                </span>
              </td>
              <td className="p-4 text-right flex justify-end gap-3 text-gray-400">
                <button className="hover:text-indigo-600"><Edit3 size={18}/></button>
                <button className="hover:text-red-500"><Trash2 size={18}/></button>
                <button className="hover:text-gray-800"><ExternalLink size={18}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageNews;