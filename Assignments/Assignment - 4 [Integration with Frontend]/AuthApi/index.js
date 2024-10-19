const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

// Use CORS middleware and specify allowed origin
app.use(cors({
    origin: 'http://localhost:5173', // Replace this with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true // Allow credentials if needed
}));

// Register route
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are present
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    // Here you would normally check if the user already exists, hash the password, and save the user to a database
    // For now, we can send a dummy token
    const token = 'sample-registration-token'; // Dummy token, you will replace it with JWT generation

    res.status(201).json({ token }); // Respond with a token
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // In a real scenario, you would validate user credentials here and generate a token
    // Dummy logic for example:
    if (email === 'test@example.com' && password === 'password') {
        const token = 'sample-login-token'; // Replace with real JWT generation logic
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Logout from current device route
app.post('/logout', (req, res) => {
    // Logic for logging out from current device
    res.status(200).send('Logged out from current device');
});

// Logout from all devices route
app.post('/logoutAll', (req, res) => {
    // Logic for logging out from all devices
    res.status(200).send('Logged out from all devices');
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
