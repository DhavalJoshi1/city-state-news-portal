import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Mail, Loader2, AlertCircle, KeyRound, ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      
      setMessage({ 
        type: 'success', 
        text: 'If this email is registered, a reset link has been sent. Please check your inbox.' 
      });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Something went wrong. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[30px] shadow-xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-indigo-600 rounded-2xl text-white mb-4 shadow-lg shadow-indigo-200">
            <KeyRound size={28} />
          </div>
          <h2 className="text-3xl font-black italic text-slate-900 tracking-tighter uppercase">
            FORGOT <span className="text-indigo-600">KEY?</span>
          </h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">
            Reset your newsroom credentials
          </p>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 border-l-4 rounded-r-xl flex items-center gap-3 ${
            message.type === 'success' ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700'
          }`}>
            <AlertCircle size={20} className="shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">{message.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                required 
                value={email}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-semibold text-slate-700"
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={`w-full py-4 rounded-2xl font-black text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
              loading ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
            }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : "SEND RESET LINK"}
          </button>
        </form>

        <p className="text-center mt-8">
          <Link to="/login" className="inline-flex items-center gap-2 text-[10px] font-black text-slate-400 tracking-widest hover:text-indigo-600 transition-colors uppercase">
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;