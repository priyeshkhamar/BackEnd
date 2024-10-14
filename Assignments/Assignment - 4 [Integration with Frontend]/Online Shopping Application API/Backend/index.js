const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/UsersRoutes');
const productRoutes = require('./routes/ProductsRoutes');
const orderRoutes = require('./routes/OrdersRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connection to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});