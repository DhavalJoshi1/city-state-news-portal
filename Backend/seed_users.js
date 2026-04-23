const mongoose = require('mongoose');
const User = require('./src/Models/User');

const MONGO_URI = 'mongodb://127.0.0.1:27017/city_state_news';

async function seedUsers() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const users = [
            { name: 'Admin User', email: 'admin@example.com', password: 'Admin@123', role: 'admin' },
            { name: 'Test User', email: 'test@example.com', password: 'Test@123', role: 'user' },
            { name: 'Demo User', email: 'user@example.com', password: 'User@123', role: 'user' }
        ];

        for (const userData of users) {
            let existingUser = await User.findOne({ email: userData.email });
            if (!existingUser) {
                const user = new User(userData);
                await user.save();
                console.log(`✅ Created user: ${userData.email}`);
            } else {
                console.log(`⚠️ User already exists: ${userData.email}`);
                // Update password to ensure it matches the test credentials
                existingUser.password = userData.password;
                await existingUser.save();
                console.log(`✅ Updated password for: ${userData.email}`);
            }
        }

        console.log('🚀 Successfully Seeded Test Users!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding users:', error);
        process.exit(1);
    }
}

seedUsers();
