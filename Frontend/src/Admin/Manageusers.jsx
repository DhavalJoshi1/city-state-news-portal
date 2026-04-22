import React, { useState } from 'react';
import { Search, UserPlus, MoreVertical, Shield, UserX, CheckCircle } from 'lucide-react';

const ManageUser = () => {
  const [users] = useState([
    { id: 1, name: "Zeeshan Khan", email: "zee@example.com", role: "Admin", status: "Active", img: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Sarah Ahmed", email: "sarah@news.com", role: "Editor", status: "Inactive", img: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Rahul Varma", email: "rahul@ads.com", role: "Advertiser", status: "Active", img: "https://i.pravatar.cc/150?u=3" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-500 text-sm">Manage staff roles and permissions</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
          <UserPlus size={18} /> Add New User
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50/50 border-b flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input type="text" placeholder="Search by name or email..." className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-semibold">
            <tr>
              <th className="p-4">User Details</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4">Joined</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={user.img} className="w-10 h-10 rounded-full border" alt="avatar" />
                    <div>
                      <div className="font-bold text-gray-800">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`flex items-center gap-1 text-sm ${user.role === 'Admin' ? 'text-indigo-600' : 'text-gray-600'}`}>
                    <Shield size={14} /> {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">April 05, 2026</td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-500" title="Block User"><UserX size={18}/></button>
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-indigo-600"><MoreVertical size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;