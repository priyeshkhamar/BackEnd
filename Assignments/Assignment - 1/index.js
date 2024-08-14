// const http = require('http');
// const { add, sub, mul, div, mod } = require('./add');

// http.createServer((req, res) => {
//     res.write("Hello World!\n");
//     res.write("Hello World 1!\n");
//     res.write("Hello World 2!\n");
//     res.write("Addition is " + add(20, 15) + "\n");
//     res.write("Subtraction is " + sub(20, 15) + "\n");
//     res.write("Multiplication is " + mul(20, 15) + "\n");
//     res.write("Division is " + div(20, 4) + "\n");
//     res.write("Modulo is " + mod(20, 15));
//     res.end();
// }).listen(3000);

const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})
app.get('/home', function (req, res) {
    res.send('<h1>My Home Page</h1>')
})
app.get('/about', function (req, res) {
    res.send('<h1>My About Page</h1>')
})

app.listen(3001);