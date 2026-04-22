import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadCloud, CheckCircle, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { BASE_URL } from '../../Utils/constants';
import Navbar from '../Navbar';

const SubmitNews = () => {
    const { token, user } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        city: '',
        image: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [catRes, cityRes] = await Promise.all([
                    axios.get(`${BASE_URL}/v1/categories`),
                    axios.get(`${BASE_URL}/v1/cities`)
                ]);
                setCategories(catRes.data.data.categories);
                setCities(cityRes.data.data.cities);

                if (id) {
                    const newsRes = await axios.get(`${BASE_URL}/v1/news/post/${id}`);
                    const newsData = newsRes.data.data.news;
                    setFormData({
                        title: newsData.title,
                        content: newsData.content,
                        category: newsData.category?._id,
                        city: newsData.city?._id,
                        image: null
                    });
                }
            } catch (error) {
                console.error("Error fetching form data:", error);
            }
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key]) data.append(key, formData[key]);
        });

        try {
            if (id) {
                await axios.patch(`${BASE_URL}/v1/news/${id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
                });
            } else {
                await axios.post(`${BASE_URL}/v1/news`, data, {
                    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
                });
            }
            if (token && user?.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/journalist/dashboard');
            }
        } catch (error) {
            console.error("Error submitting news:", error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Navbar />
            <div className="max-w-3xl mx-auto pt-32 pb-20 px-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 text-[#1e3a8a] hover:text-blue-400 font-black uppercase text-[10px] tracking-widest mb-8 transition-colors"
                >
                    <ChevronLeft size={16} /> Back to Desk
                </button>

                <div className="bg-[#0a0a0a] rounded-[2.5rem] p-10 border border-[#1e3a8a]/20 shadow-2xl">
                    <h1 className="text-4xl font-black uppercase italic tracking-tighter mb-2">
                        {id ? 'Edit' : 'Submit'} <span className="text-[#1e40af]">Story</span>
                    </h1>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-10">Verification required before publication</p>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="relative group">
                            <label className="block text-[10px] font-black uppercase tracking-widest text-[#1e3a8a] mb-3 ml-2">Main Image</label>
                            <div className="border-2 border-dashed border-[#1e3a8a]/20 rounded-3xl p-12 text-center hover:border-blue-500/50 transition cursor-pointer group bg-black/40 relative overflow-hidden">
                                <input 
                                    type="file" 
                                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                                />
                                <UploadCloud className="mx-auto text-[#1e3a8a]/30 group-hover:text-[#1e40af] mb-4 transition-colors" size={48} />
                                <p className="text-xs font-bold text-slate-400">
                                    {formData.image ? formData.image.name : 'Upload Feature Image (PNG/JPG)'}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-[#1e3a8a] mb-3 ml-2">Headline</label>
                                <input 
                                    type="text" 
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="What's breaking?" 
                                    className="w-full p-5 bg-black border border-[#1e3a8a]/30 rounded-2xl outline-none focus:border-[#1e40af] focus:ring-1 focus:ring-[#1e40af]/30 transition-all font-bold text-white placeholder-slate-700" 
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#1e3a8a] mb-3 ml-2">Region</label>
                                    <select 
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full p-5 bg-black border border-[#1e3a8a]/30 rounded-2xl outline-none focus:border-[#1e40af] font-bold text-slate-400 appearance-none"
                                        required
                                    >
                                        <option value="">Select City</option>
                                        {cities.map(c => <option key={c._id} value={c._id} className="text-white">{c.name}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#1e3a8a] mb-3 ml-2">Beat/Category</label>
                                    <select 
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full p-5 bg-black border border-[#1e3a8a]/30 rounded-2xl outline-none focus:border-[#1e40af] font-bold text-slate-400 appearance-none"
                                        required
                                    >
                                        <option value="">Choose Category</option>
                                        {categories.map(c => <option key={c._id} value={c._id} className="text-white">{c.name}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-[#1e3a8a] mb-3 ml-2">Full Story</label>
                                <textarea 
                                    rows="8" 
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                    placeholder="Provide detailed information, quotes, and facts..." 
                                    className="w-full p-5 bg-black border border-[#1e3a8a]/30 rounded-2xl outline-none focus:border-[#1e40af] focus:ring-1 focus:ring-[#1e40af]/30 transition-all font-medium text-slate-300 placeholder-slate-700"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#1e40af] text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-2xl shadow-blue-900/30 active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? 'Transmitting...' : id ? 'Update Report' : 'Dispatch Story'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmitNews;