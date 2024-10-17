require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);

app.use(cors({
    origin: 'http://localhost:5173'
}));

mongoose.connect('mongodb://localhost:27017/session_management');

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
