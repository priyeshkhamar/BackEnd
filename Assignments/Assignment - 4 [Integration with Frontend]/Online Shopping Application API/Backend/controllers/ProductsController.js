const ProductsModel = require('../models/ProductsModel');

const productlist = async (req, res) => {
    let data = await ProductsModel.find();
    res.json({
        data: data,
        msg: "Product List displayed successfully!"
    });
};

const addproduct = async (req, res) => {
    console.log(req.body);
    const { productid, productName, price, description, category } = req.body;

    let data;
    if (productid) {
        // Update existing product
        data = await ProductsModel.findByIdAndUpdate(productid, {
            productName,
            price,
            description,
            category
        }, { new: true }); // Return the updated document
    } else {
        // Create a new product
        data = new ProductsModel({
            productName,
            price,
            description,
            category
        });
        await data.save();
    }

    res.json({
        msg: productid ? "Product updated successfully!" : "Product added successfully!",
        data: data
    });
};

const deleteproduct = async (req, res) => {
    const id = req.params.id;
    const data = await ProductsModel.findByIdAndDelete(id);
    if (data) {
        res.json({ msg: "Product deleted successfully!" });
    } else {
        res.status(404).json({ msg: "Product not found!" });
    }
};

const editproduct = async (req, res) => {
    const id = req.params.id;
    const data = await ProductsModel.findById(id);
    if (data) {
        res.json({ data: data, msg: "Product fetched successfully!" });
    } else {
        res.status(404).json({ msg: "Product not found!" });
    }
};

module.exports = { productlist, addproduct, deleteproduct, editproduct };