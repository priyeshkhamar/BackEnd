const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).json({ message: 'User registered', token });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = await user.generateAuthToken();
        res.cookie('token', token, { httpOnly: true });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
};

// Logout from one device
exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);
        await req.user.save();
        res.clearCookie('token');
        res.json({ message: 'Logged out from current session' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
};

// Logout from all devices
exports.logoutAll = async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.clearCookie('token');
        res.json({ message: 'Logged out from all sessions' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
};
