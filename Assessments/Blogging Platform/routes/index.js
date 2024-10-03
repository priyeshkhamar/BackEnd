const express = require('express');
const router = express.Router();

const posts = [
    { title: "First Blog Post", content: "This is the first post's content." },
    { title: "Second Blog Post", content: "This is the second post's content." },
];

router.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

router.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

router.get('/blog', (req, res) => {
    res.render('blog', { title: 'Blog', posts });
});

module.exports = router;
