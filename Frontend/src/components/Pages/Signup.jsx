import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, UserPlus, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Account Created:", formData);
    // Yahan hum user ko login page par bhej rahe hain taaki wo ab log in kar sake
    alert("Account created successfully! Please Log In.");
    navigate('/login');
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl border border-slate-100 p-8 md:p-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-indigo-600 rounded-2xl text-white mb-4 shadow-lg shadow-indigo-200">
            <UserPlus size={28} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
          <p className="text-slate-500 font-medium mt-2">Join City State News Portal</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group"
          >
            Create Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="text-center mt-8 text-sm font-medium text-slate-500">
          Already have an account? <Link to="/login" className="text-indigo-600 font-black hover:underline">Log In</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;