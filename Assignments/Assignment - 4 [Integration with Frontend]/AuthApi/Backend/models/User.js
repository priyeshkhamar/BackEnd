// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tokens: [{ type: String }] // To store JWT tokens for each session
});

module.exports = mongoose.model('User', userSchema);
