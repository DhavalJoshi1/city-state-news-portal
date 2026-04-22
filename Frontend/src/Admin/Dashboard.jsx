import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Newspaper, Megaphone, Users, PlusCircle, Trash2 } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ news: 0, ads: 0 });
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Data fetch karne ka logic yahan aayega
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const resNews = await axios.get('http://localhost:3000/api/v1/news');
    setNews(resNews.data.data);
    setStats({ news: resNews.data.data.length, ads: 12 }); // Ads count dummy hai abhi
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* --- Sidebar --- */}
      <div className="w-64 bg-slate-900 text-white p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-blue-400">CityNews Admin</h2>
        <nav className="space-y-4">
          <div className="flex items-center space-x-3 p-2 bg-blue-600 rounded-lg cursor-pointer">
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition">
            <Newspaper size={20} /> <span>Manage News</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-slate-800 rounded-lg cursor-pointer transition">
            <Megaphone size={20} /> <span>Manage Ads</span>
          </div>
        </nav>
      </div>

      {/* --- Main Content --- */}
      <div className="flex-1 overflow-y-auto p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Overview</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
            <PlusCircle size={20} /> Create News
          </button>
        </header>

        {/* --- Stats Cards --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
            <p className="text-gray-500 font-medium">Total Articles</p>
            <h3 className="text-3xl font-bold">{stats.news}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
            <p className="text-gray-500 font-medium">Active Ads</p>
            <h3 className="text-3xl font-bold">{stats.ads}</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500">
            <p className="text-gray-500 font-medium">Portal Users</p>
            <h3 className="text-3xl font-bold">1,240</h3>
          </div>
        </div>

        {/* --- Data Table --- */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4 font-semibold text-gray-600">News Title</th>
                <th className="p-4 font-semibold text-gray-600">Category</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-medium text-gray-800">{item.title}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500 text-sm">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 flex justify-center gap-4">
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;