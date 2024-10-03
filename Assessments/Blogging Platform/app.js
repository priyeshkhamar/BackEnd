const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

app.use((req, res, next) => {
    res.status(404).render('404', { title: 'Page Not Found' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
