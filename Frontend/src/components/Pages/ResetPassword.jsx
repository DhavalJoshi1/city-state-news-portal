import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { token } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    setLoading(true);
    setError('');

    try {
      await axios.patch(`${API_URL}/auth/reset-password/${token}`, {
        newPassword
      });

      alert("Password updated successfully! You can now login.");
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Token is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[30px] shadow-xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-indigo-600 rounded-2xl text-white mb-4 shadow-lg shadow-indigo-200">
            <ShieldCheck size={28} />
          </div>
          <h2 className="text-3xl font-black italic text-slate-900 tracking-tighter uppercase">
            SET NEW <span className="text-indigo-600">SECRET</span>
          </h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">
            Update your newsroom password
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl flex items-center gap-3">
            <AlertCircle size={20} className="shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="At least 8 characters" 
                required 
                minLength={8}
                value={newPassword}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-semibold text-slate-700"
                onChange={(e) => setNewPassword(e.target.value)} 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Confirm New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="Confirm password" 
                required 
                value={confirmPassword}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-semibold text-slate-700"
                onChange={(e) => setConfirmPassword(e.target.value)} 
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
            {loading ? <Loader2 className="animate-spin" /> : "RESET PASSWORD"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;