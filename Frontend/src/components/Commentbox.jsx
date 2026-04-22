import React, { useState } from 'react';
import { Send, Heart } from 'lucide-react';

const CommentBox = () => {
  const [comment, setComment] = useState('');

  return (
    <div className="bg-gray-50 rounded-2xl p-6">
      <h4 className="font-bold text-gray-800 mb-4 text-lg">Discussion (24)</h4>
      <div className="flex gap-4 mb-8">
        <img src="https://i.pravatar.cc/100" className="w-10 h-10 rounded-full" />
        <div className="flex-1 relative">
          <textarea 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a thoughtful comment..."
            className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition min-h-[100px]"
          />
          <button className="absolute bottom-3 right-3 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition">
            <Send size={18} />
          </button>
        </div>
      </div>
      
      {/* Sample Comment */}
      <div className="space-y-6">
        <div className="flex gap-4">
           <img src="https://i.pravatar.cc/100?u=9" className="w-8 h-8 rounded-full" />
           <div>
             <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm">Alex Johnson</span>
                <span className="text-[10px] text-gray-400">1 hour ago</span>
             </div>
             <p className="text-sm text-gray-600">Great insights! Looking forward to more updates on this.</p>
             <button className="flex items-center gap-1 text-xs text-gray-400 mt-2 hover:text-red-500">
                <Heart size={12} /> 12 Likes
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};
export default CommentBox;