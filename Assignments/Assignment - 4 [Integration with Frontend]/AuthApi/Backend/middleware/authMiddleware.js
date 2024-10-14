// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = 'your-secret-key';  // Move to .env for production

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        req.token = token;

        const user = await User.findById(decoded.userId);
        if (!user || !user.tokens.includes(token)) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authMiddleware;
