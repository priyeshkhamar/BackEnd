const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory (if it's in a custom folder)
// app.set('views', path.join(__dirname, 'views'));

// Static folder for serving CSS, JS, and other public assets
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));

// Handle 404 - Keep this as the last route
app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
