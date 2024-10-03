const express = require('express');
const router = express.Router();

// Dummy blog posts
const posts = [
    { title: "First Blog Post", content: "This is the first post's content." },
    { title: "Second Blog Post", content: "This is the second post's content." },
];

// Home route
router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

// About Us route
router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

// Contact Us route
router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Blog route
router.get('/blog', (req, res) => {
    res.render('blog', { title: 'Blog', posts });
});

module.exports = router;
