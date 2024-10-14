const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => console.log('Database connected!'))
        .catch((err) => {
            console.error('Database connection error:', err.message);
        });
};

module.exports = connectDB;
