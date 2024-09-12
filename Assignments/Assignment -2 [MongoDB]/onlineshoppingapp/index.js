const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();

const url = 'mongodb://localhost:27017';
const dbName = 'onlineShoppingApp';

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

let db;

MongoClient.connect(url).then(client => {
    db = client.db(dbName);
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log('Server started at port 3000'));
});

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/products', (req, res) => {
    db.collection('Product').find().sort({ price: 1 }).toArray().then(products => {
        res.render('products', { products });
    });
});

app.get('/addProduct', (req, res) => {
    res.render('addProduct');
});

app.post('/addProduct', (req, res) => {
    const product = {
        name: req.body.name,
        price: parseFloat(req.body.price),
        categoryId: req.body.categoryId
    };

    db.collection('Products').insertOne(product).then(() => {
        db.collection('Products').find().sort({ price: 1 }).toArray().then(products => {
            res.render('products', { products });
        });
    });
});

app.post('/updateProductPrice', (req, res) => {
    const productId = req.body.productId;
    const newPrice = parseFloat(req.body.price);

    if (!isNaN(newPrice)) {
        db.collection('Products').updateOne({ _id: new ObjectId(productId) }, { $set: { price: newPrice } }).then(() => {
            db.collection('Products').find().sort({ price: 1 }).toArray().then(products => {
                res.render('products', { products });
            });
        });
    } else {
        res.send('Invalid Price');
    }
});

app.post('/deleteProduct', (req, res) => {
    const productId = req.body.productId;

    db.collection('Products').deleteOne({ _id: new ObjectId(productId) }).then(() => {
        db.collection('Products').find().sort({ price: 1 }).toArray().then(products => {
            res.render('products', { products });
        });
    });
});