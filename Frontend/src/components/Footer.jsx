import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Newspaper, Globe, Send, Share2, Mail, Phone, ArrowUpRight, ShieldCheck 
} from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  // Categories helper to avoid repetition
  const categories = [
    { name: 'Politics', slug: 'politics' },
    { name: 'Business', slug: 'business' },
    { name: 'Sports', slug: 'sports' },
    { name: 'Technology', slug: 'technology' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1120] text-white pt-20 pb-10 border-t border-[#B8860B]/20 font-sans">
      <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        
        {/* --- SECTION 1: BRAND IDENTITY --- */}
        <div className="space-y-8">
          <Link to="/" onClick={scrollToTop} className="flex items-center gap-3 group w-fit">
            <div className="bg-[#D4AF37] p-2.5 rounded-xl shadow-[0_0_20px_rgba(30,64,175,0.3)] group-hover:rotate-12 transition-transform duration-500">
              <Newspaper size={28} className="text-black" />
            </div>
            <h2 className="text-2xl font-black tracking-tighter uppercase italic leading-none">
              City State <br/> <span className="text-[#D4AF37] text-sm not-italic tracking-[0.3em]">News Portal</span>
            </h2>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed font-medium italic">
            "Ahmedabad's digital heartbeat. Delivering high-impact journalism and real-time state updates directly to your screen."
          </p>
        </div>

        {/* --- SECTION 2: DYNAMIC CATEGORIES --- */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-[#D4AF37]">Pulse Categories</h3>
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link 
                  to={`/category/${cat.slug}`} 
                  onClick={scrollToTop}
                  className="text-gray-400 text-sm font-bold hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* --- SECTION 3: REGIONAL & ADMIN --- */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-[#D4AF37]">Coverage</h3>
          <ul className="space-y-4">
            <li>
              <Link to="/state/gujarat" onClick={scrollToTop} className="text-gray-400 text-sm font-bold hover:text-white transition-all flex items-center justify-between group">
                Gujarat News <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/>
              </Link>
            </li>
            <li>
              <Link to="/city/ahmedabad" onClick={scrollToTop} className="text-gray-400 text-sm font-bold hover:text-white transition-all flex items-center justify-between group">
                Ahmedabad Local <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all"/>
              </Link>
            </li>
            <li className="pt-4">
              <Link 
                to="/login" 
                onClick={scrollToTop}
                className="flex items-center gap-2 text-[#D4AF37] font-black text-xs uppercase tracking-widest hover:text-[#FDE047] transition-colors"
              >
                <ShieldCheck size={16} /> Admin Control
              </Link>
            </li>
          </ul>
        </div>

        {/* --- SECTION 4: CONTACT & CONNECT --- */}
        <div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-8 text-[#D4AF37]">Direct Line</h3>
          
          <div className="flex gap-4 mb-10">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-3 bg-[#0F172A] border border-[#B8860B]/20 rounded-2xl text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all shadow-lg active:scale-90">
              <Share2 size={20} />
            </a>
            <a href="https://t.me" target="_blank" rel="noreferrer" className="p-3 bg-[#0F172A] border border-[#B8860B]/20 rounded-2xl text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all shadow-lg active:scale-90">
              <Send size={20} />
            </a>
          </div>

          <div className="space-y-4">
            <a href="mailto:joshidhaval1503@gmail.com" className="flex items-center gap-4 group">
              <div className="p-2 bg-[#0F172A] border border-[#B8860B]/20 rounded-xl group-hover:border-[#D4AF37] transition-colors">
                <Mail size={18} className="text-[#D4AF37]" />
              </div>
              <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">joshidhaval1503@gmail.com</span>
            </a>
            <a href="tel:+918128328169" className="flex items-center gap-4 group">
              <div className="p-2 bg-[#0F172A] border border-[#B8860B]/20 rounded-xl group-hover:border-[#D4AF37] transition-colors">
                <Phone size={18} className="text-[#D4AF37]" />
              </div>
              <span className="text-xs font-bold text-gray-500 group-hover:text-white transition-colors">+91 81283 28169</span>
            </a>
          </div>
        </div>
      </div>

      {/* --- BOTTOM BAR --- */}
      <div className="max-w-[1440px] mx-auto mt-20 pt-8 border-t border-[#B8860B]/10 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col md:flex-row items-center gap-2 text-[10px] font-black text-gray-600 tracking-[0.2em] uppercase">
          <span>© 2026 CITY STATE NEWS</span>
          <span className="hidden md:block">|</span>
          <span>Designed & Developed by <span className="text-[#D4AF37]">DHAVAL JOSHI</span></span>
        </div>
        
        <button 
          onClick={scrollToTop}
          className="bg-[#0F172A] border border-[#B8860B]/30 px-8 py-2.5 rounded-full text-[10px] font-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all uppercase tracking-widest active:scale-95 shadow-2xl"
        >
          Back To Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;