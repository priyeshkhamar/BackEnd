const mongoose = require('mongoose');

const schema = mongoose.Schema;

const ProductSchema = new schema({
    productName: String,
    price: Number,
    description: String,
    category: String
});

const ProductsModel = mongoose.model("Products", ProductSchema);

module.exports = ProductsModel;