const mongoose = require('mongoose');
const User = require('./src/Models/User');

const MONGO_URI = 'mongodb://127.0.0.1:27017/city_state_news';

async function updatePassword() {
    try {
        await mongoose.connect(MONGO_URI);
        const email = 'dhaval11@gmail.com';
        
        const user = await User.findOne({ email });
        if (!user) {
            console.log(`User ${email} not found.`);
        } else {
            console.log(`Found user: ${user.name} with role: ${user.role}`);
            user.password = 'Admin@123';
            await user.save();
            console.log(`Password reset successfully for ${email}`);
        }
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

updatePassword();
