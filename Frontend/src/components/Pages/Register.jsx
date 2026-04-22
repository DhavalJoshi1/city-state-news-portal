import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Loader2, AlertCircle, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register, token } = useAuth();
  
  // ✅ 1. Auth Check: Agar user pehle se logged in hai toh register page block karo
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // ✅ 2. Basic Validation (Frontend side)
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      // ✅ Using register function from AuthContext
      const res = await register({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role
      });

      if (res.success) {
        alert("🛡️ Portal Identity Created Successfully! Please Login.");
        navigate('/login');
      } else {
        setError(res.message);
      }
    } catch (err) {
      setError("Registration Failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[30px] shadow-xl p-10 border border-slate-100">
        
        <div className="text-center mb-10">
          <div className="inline-flex p-4 bg-indigo-600 rounded-2xl text-white mb-4 shadow-lg shadow-indigo-200">
            <UserPlus size={28} />
          </div>
          <h2 className="text-3xl font-black italic text-slate-900 tracking-tighter">
            JOIN THE <span className="text-indigo-600">PORTAL</span>
          </h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">
            Create your newsroom identity
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl flex items-center gap-3">
            <AlertCircle size={20} className="shrink-0" />
            <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Ex: Aman Sharma" 
                required 
                autoComplete="name"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-semibold text-slate-700" 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="email" 
                placeholder="name@example.com" 
                required 
                autoComplete="email"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-semibold text-slate-700"
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Secret Key (Password)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="Min. 8 characters" 
                required 
                autoComplete="new-password"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 transition-all font-semibold text-slate-700"
                onChange={(e) => setFormData({...formData, password: e.target.value})} 
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-1">
            <label className="text-[9px] font-black uppercase text-slate-400 tracking-widest ml-1">Access Level</label>
            <select 
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-indigo-500 font-bold text-slate-700 cursor-pointer"
              onChange={(e) => setFormData({...formData, role: e.target.value})}
              value={formData.role}
            >
              <option value="user">Reader (User)</option>
              <option value="reporter">Reporter (News Creator)</option>
              <option value="admin">Administrator</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className={`w-full py-4 rounded-2xl font-black text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${
              loading ? 'bg-slate-200 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-100'
            }`}
          >
            {loading ? <Loader2 className="animate-spin" /> : "AUTHENTICATE & JOIN"}
          </button>
        </form>

        <p className="text-center mt-8 text-[10px] font-black text-slate-400 tracking-widest">
          ALREADY A MEMBER? <Link to="/login" className="text-indigo-600 hover:underline">LOG IN NOW</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;