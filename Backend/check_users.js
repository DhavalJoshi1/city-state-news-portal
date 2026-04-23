const mongoose = require('mongoose');
const User = require('./src/Models/User');

const MONGO_URI = 'mongodb://127.0.0.1:27017/city_state_news';

async function check() {
    try {
        await mongoose.connect(MONGO_URI);
        const users = await User.find({}, 'name email role');
        console.log("USERS:");
        console.log(users);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
