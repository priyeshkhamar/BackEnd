// index.js
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const secureRoutes = require('./routes/secure');
require('dotenv').config();

const app = express();

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/session-management', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/auth', authRoutes);   // Authentication routes
app.use('/api', secureRoutes);  // Secured routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
