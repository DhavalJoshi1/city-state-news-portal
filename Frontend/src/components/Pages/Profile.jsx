import React from 'react';
import { Settings, Bookmark, FileText, Heart, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../Navbar';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-indigo-50 p-10 rounded-[3rem] mb-12">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden flex items-center justify-center bg-white">
            <UserIcon size={64} className="text-indigo-200" />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-3xl font-black text-gray-900">{user?.name || "Member Name"}</h1>
            <p className="text-indigo-600 font-bold text-sm uppercase tracking-tighter">
              {user?.role || "User"} • Joined {new Date(user?.createdAt).getFullYear() || 2026}
            </p>
            <div className="flex gap-4 mt-4 justify-center md:justify-start">
               <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center font-bold">
                 <p className="text-xs text-gray-400">Status</p> <p className="text-green-600">Active</p>
               </div>
               <div className="bg-white px-4 py-2 rounded-xl shadow-sm text-center font-bold">
                 <p className="text-xs text-gray-400">Email</p> <p className="text-sm">{user?.email}</p>
               </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-3 bg-white rounded-2xl shadow-sm text-gray-400 hover:text-indigo-600 transition"><Settings/></button>
            <button 
              onClick={logout}
              className="p-3 bg-white rounded-2xl shadow-sm text-red-400 hover:text-red-600 transition"
              title="Logout"
            >
              <LogOut/>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 md:col-span-1 space-y-2">
             <button className="w-full flex items-center gap-3 p-4 bg-indigo-600 text-white rounded-2xl font-bold"><FileText size={18}/> My Submissions</button>
             <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-2xl font-bold text-gray-500"><Bookmark size={18}/> Saved Stories</button>
             <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-2xl font-bold text-gray-500"><Heart size={18}/> Liked News</button>
          </div>
          <div className="col-span-3 md:col-span-2">
             <div className="bg-gray-50 h-96 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-gray-200">
                <p className="text-gray-400 italic">No submissions found yet.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;