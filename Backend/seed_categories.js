const mongoose = require('mongoose');
const News = require('./src/Models/News');
const City = require('./src/Models/City');
const Category = require('./src/Models/Category');
const User = require('./src/Models/User');

const MONGO_URI = 'mongodb://127.0.0.1:27017/city_state_news';

async function seedCategories() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            console.log('❌ Admin user not found. Please register an admin first.');
            process.exit(1);
        }

        const city = await City.findOne({ name: 'Ahmedabad' });
        const cityId = city ? city._id : (await City.create({ name: 'Ahmedabad', state: 'Gujarat' }))._id;

        const categories = ['Politics', 'Business', 'Sports', 'Technology'];
        const catMap = {};
        for (const name of categories) {
            let cat = await Category.findOne({ name });
            if (!cat) cat = await Category.create({ name });
            catMap[name] = cat._id;
        }

        const newsData = [
            // POLITICS (5 items)
            {
                title: "Election Commission announces new Digital Voting trial for 2026",
                content: "High-level delegation discusses the implementation of remote voting systems for NRIs.",
                summary: "Digital voting steps into the next phase of Indian democracy.",
                image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1200",
                category: catMap['Politics'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "State Budget 2026: Major focus on Public Healthcare and Education",
                content: "The Finance Minister unveils a growth-oriented budget with record allocations for rural clinics.",
                summary: "Record ₹50,000 Crore allocated for upgrade of government hospitals.",
                image: "https://images.unsplash.com/photo-1541872703-74c5e4ef3f4f?q=80&w=1200",
                category: catMap['Politics'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "Diplomatic talks strengthen trade ties with European Union",
                content: "Prime Minister holds bilateral talks focusing on clean energy and space technology collaboration.",
                summary: "New trade corridors expected to boost industrial growth.",
                image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=1200",
                category: catMap['Politics'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "Parliament passes landmark bill for Women Safety in urban areas",
                content: "The new legislation mandates panic buttons and AI-driven surveillance in all public transport.",
                summary: "Legal framework tightened to ensure safety for women in metros.",
                image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1200",
                category: catMap['Politics'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "Local Council members pledge to transform city into a Zero-Waste zone",
                content: "A new waste-to-energy plant will process 500 tons of garbage daily by next October.",
                summary: "The city aims for the 'Cleanest Metro' title in 2027.",
                image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200",
                category: catMap['Politics'], city: cityId, createdBy: admin._id, status: 'published'
            },

            // BUSINESS (5 items)
            {
                title: "Indian Tech Giants report record quarterly profits in AI services",
                content: "Focus on generative AI has boosted margins for top-tier IT service firms this quarter.",
                summary: "Market cap of top firms crosses record milestones.",
                image: "https://images.unsplash.com/photo-1611974714014-4b52115eeaf0?q=80&w=1200",
                category: catMap['Business'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "New Startup hub in Gandhinagar attracts $2 Billion in VC funding",
                content: "Gujarat's GIFT City is emerging as the preferred destination for global fintech startups.",
                summary: "Fintech revolution gains momentum in the heart of Gujarat.",
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200",
                category: catMap['Business'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "Gold prices hit record high amid global economic shifts",
                content: "Investors turn to safe-haven assets as central banks adjust interest rates worldwide.",
                summary: "Bullion market sees a 15% surge in retail demand.",
                image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1200",
                category: catMap['Business'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "Auto Sector sees 30% jump in EV sales compared to last year",
                content: "Advancements in battery range and charging networks are driving consumer shift to electric cars.",
                summary: "Electric mobility is no longer a niche, but a mainstream choice.",
                image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1200",
                category: catMap['Business'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "Real Estate boom continues as demand for luxury housing peaks",
                content: "Smart-home integrated villas are seeing fast bookings in Ahmedabad and Surat suburbs.",
                summary: "Urban infrastructure development is pushing property values high.",
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200",
                category: catMap['Business'], city: cityId, createdBy: admin._id, status: 'published'
            },

            // SPORTS (5 items)
            {
                title: "Indian Cricket Team secures #1 spot in ICC Test Rankings",
                content: "The team's dominant performance in the home series has cemented their top position.",
                summary: "Consistency in bowling and middle-order batting pays off.",
                image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200",
                category: catMap['Sports'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "Olympic Qualifiers: Three local athletes selected for National Camp",
                content: "Performances in the State Athletics meet have opened doors for global competition.",
                summary: "The state continues to produce world-class sprinting talent.",
                image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200",
                category: catMap['Sports'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "New Tennis Academy to be launched by Global Champions in the city",
                content: "The facility will include 12 clay courts and high-performance training labs.",
                summary: "Affordable training for future Grand Slam aspirants.",
                image: "https://images.unsplash.com/photo-1595435064219-c7329525fd8d?q=80&w=1200",
                category: catMap['Sports'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "Kabbadi League: Gujarat Giants dominate the table in Season 13",
                content: "A string of undefeated home games puts the team in a strong position for the semi-finals.",
                summary: "Home crowd support proves to be the 'X-factor' for victory.",
                image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200",
                category: catMap['Sports'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "National Football League eyes city for upcoming season qualifiers",
                content: "The state stadium's world-class turf is being reviewed for high-profile matches.",
                summary: "Football popularity continues to rise among the local youth.",
                image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200",
                category: catMap['Sports'], city: cityId, createdBy: admin._id, status: 'published'
            },

            // TECHNOLOGY (5 items)
            {
                title: "Local AI Startup develops first GPT-integrated smart glasses",
                content: "The device offers real-time translation and object recognition for visually impaired users.",
                summary: "Indigenous innovation setting new standards in wearable tech.",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
                category: catMap['Technology'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "5G-Advanced Connectivity launched officially in major districts",
                content: "Users will now experience speeds up to 10 Gbps with near-zero latency for cloud gaming.",
                summary: "The digital divide narrows as connectivity reaches remote villages.",
                image: "https://images.unsplash.com/photo-1526435227181-2aa859b9e651?q=80&w=1200",
                category: catMap['Technology'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "Quantum Computing Lab established at State University",
                content: "The facility will research secure cryptographic systems and drug discovery algorithms.",
                summary: "Future-proofing the state's technical education infrastructure.",
                image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1200",
                category: catMap['Technology'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "Cybersecurity Alert: New wave of phishing attacks targeting UPI users",
                content: "Experts advise enabling multi-factor authentication and avoiding suspicious links.",
                summary: "Stay safe in the digital age with proactive security measures.",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200",
                category: catMap['Technology'], city: cityId, createdBy: admin._id, status: 'published'
            },
            {
                title: "Green Tech: New Hydrogen Fuel Cells developed by Local Engineers",
                content: "The fuel cells can power commercial trucks for 1000km with a single refill of water-derived hydrogen.",
                summary: "Zero-emission transport becomes a reality for heavy vehicles.",
                image: "https://images.unsplash.com/photo-1611288875055-1283d5a75990?q=80&w=1200",
                category: catMap['Technology'], city: cityId, createdBy: admin._id, status: 'published'
            }
        ];

        for (const item of newsData) {
            const news = new News(item);
            await news.save();
        }
        console.log('🚀 Successfully Added 20 News Items across All Categories!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding:', error);
        process.exit(1);
    }
}

seedCategories();
