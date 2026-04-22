import React, { useState } from 'react';
import { Upload, X, CheckCircle } from 'lucide-react';

const AddNews = () => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold mb-6">Create New Article</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="Enter catchy headline..." />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea rows="8" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" placeholder="Write your story..."></textarea>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-dashed border-gray-200 p-4 rounded-2xl text-center">
            {preview ? (
              <div className="relative">
                <img src={preview} className="rounded-lg h-40 w-full object-cover" />
                <button onClick={() => setPreview(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"><X size={14}/></button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <Upload className="mx-auto text-gray-400 mb-2" />
                <span className="text-xs text-gray-500">Upload Feature Image</span>
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="w-full p-3 border border-gray-200 rounded-xl">
              <option>Technology</option>
              <option>Global Politics</option>
              <option>Sports Entertainment</option>
            </select>
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition">
            Publish Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNews;