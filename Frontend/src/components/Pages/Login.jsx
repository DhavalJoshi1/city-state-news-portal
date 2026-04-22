import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader2, AlertCircle, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await login(email, password);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[30px] shadow-xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-indigo-600 rounded-2xl text-white mb-4 shadow-lg shadow-indigo-200">
            <LogIn size={28} />
          </div>
          <h2 className="text-3xl font-black italic text-slate-900 tracking-tighter">
            WELCOME <span className="text-indigo-600">BACK</span>
          </h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">
            Secure Access to your Newsroom
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

          <div className="space-y-1">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Password</label>
              <Link to="/forgot-password" size={18} className="text-[9px] font-black uppercase text-indigo-600 tracking-widest hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-semibold text-slate-700"
                onChange={(e) => setPassword(e.target.value)} 
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
            {loading ? <Loader2 className="animate-spin" /> : "SECURE LOGIN"}
          </button>
        </form>

        <p className="text-center mt-8 text-[10px] font-black text-slate-400 tracking-widest">
          NOT A MEMBER YET? <Link to="/register" className="text-indigo-600 hover:underline">REGISTER NOW</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
