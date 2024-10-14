// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');

const JWT_SECRET = 'your-secret-key';  // Move to .env for production

// Register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        const savedUser = await newUser.save();

        // Generate token
        const token = jwt.sign({ userId: savedUser._id }, JWT_SECRET, { expiresIn: '1h' });
        savedUser.tokens.push(token);
        await savedUser.save();

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ error: 'Invalid username or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

        // Generate token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        user.tokens.push(token);
        await user.save();

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Logout from one device
router.post('/logout', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.tokens = user.tokens.filter(t => t !== req.token);
        await user.save();
        res.status(200).json({ message: 'Logged out from this device' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging out' });
    }
});

// Logout from all devices
router.post('/logout-all', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        user.tokens = [];
        await user.save();
        res.status(200).json({ message: 'Logged out from all devices' });
    } catch (error) {
        res.status(500).json({ error: 'Error logging out from all devices' });
    }
});

module.exports = router;
