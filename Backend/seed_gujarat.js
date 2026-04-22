const mongoose = require('mongoose');
const News = require('./src/Models/News');
const City = require('./src/Models/City');
const Category = require('./src/Models/Category');
const User = require('./src/Models/User');

const MONGO_URI = 'mongodb://127.0.0.1:27017/city_state_news';

async function seedGujarat() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // 1. Get Admin User
        const admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            console.log('❌ Admin user not found. Please register an admin first.');
            process.exit(1);
        }

        // 2. Get/Create Categories
        const categories = ['Politics', 'Business', 'Sports', 'Infrastructure'];
        const catMap = {};
        for (const name of categories) {
            let cat = await Category.findOne({ name });
            if (!cat) cat = await Category.create({ name });
            catMap[name] = cat._id;
        }

        // 3. Get/Create cities in Gujarat
        const gujaratCities = [
            { name: 'Ahmedabad', state: 'Gujarat' },
            { name: 'Surat', state: 'Gujarat' },
            { name: 'Rajkot', state: 'Gujarat' },
            { name: 'Gandhinagar', state: 'Gujarat' }
        ];
        const cityMap = {};
        for (const cityData of gujaratCities) {
            let city = await City.findOne({ name: cityData.name });
            if (!city) city = await City.create(cityData);
            cityMap[cityData.name] = city._id;
        }

        // 4. News Data
        const newsItems = [
            {
                title: "Ahmedabad's Sabarmati Riverfront to get a new Floating Restaurant",
                content: "The city municipal corporation has approved the plan for a world-class floating restaurant on the Sabarmati river. It will offer a unique dining experience to tourists.",
                summary: "Sabarmati Riverfront to feature Gujarat's first floating restaurant.",
                image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?q=80&w=1200",
                category: catMap['Infrastructure'],
                city: cityMap['Ahmedabad'],
                createdBy: admin._id,
                status: 'published'
            },
            {
                title: "Surat Diamond Bourse handles record-breaking international trade",
                content: "The newly inaugurated Diamond Bourse in Surat has seen a 40% jump in international buyer registrations. It is now officially the world's largest office building.",
                summary: "Surat Diamond Bourse cements its position as a global gem hub.",
                image: "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?q=80&w=1200",
                category: catMap['Business'],
                city: cityMap['Surat'],
                createdBy: admin._id,
                status: 'published'
            },
            {
                title: "Gujarat Titans announce new training facility in Rajkot",
                content: "The IPL team Gujarat Titans will set up a state-of-the-art training camp near Rajkot's cricket stadium to promote local talent.",
                summary: "Rajkot to become the second home for Gujarat Titans.",
                image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200",
                category: catMap['Sports'],
                city: cityMap['Rajkot'],
                createdBy: admin._id,
                status: 'published'
            },
            {
                title: "Gandhinagar Solar City project aims for 100% renewable shift",
                content: "The state capital is on track to become India's first completely solar-powered city by the end of 2027.",
                summary: "Gandhinagar leads India's green energy revolution.",
                image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200",
                category: catMap['Infrastructure'],
                city: cityMap['Gandhinagar'],
                createdBy: admin._id,
                status: 'published'
            }
        ];

        await News.insertMany(newsItems);
        console.log('🚀 Successfully Added Gujarat News Items!');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding:', error);
        process.exit(1);
    }
}

seedGujarat();
