const express = require('express');
const app = express();

const ApiRoutes = require('./Routes/ApiRoutes');

app.use(express.json());
app.use('/api', ApiRoutes);

app.use(express.urlencoded({ extended: false }));

app.listen(4000, () => {
    console.log("Listening to port 4000!");
});
