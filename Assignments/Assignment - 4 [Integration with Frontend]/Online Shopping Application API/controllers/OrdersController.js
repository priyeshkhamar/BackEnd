const OrdersModel = require('../models/OrdersModel');

const orderlist = async (req, res) => {
    let data = await OrdersModel.find();
    res.json({
        data: data,
        msg: "order List displayed successfully!"
    });
};

const addorder = async (req, res) => {
    const { orderid, ordername, email, password, mobile } = req.body;

    let data;
    if (orderid) {
        data = await OrdersModel.findByIdAndUpdate(orderid, {
            orderDate: orderDate,
            status: status,
            totalAmount: totalAmount
        });
    } else {
        data = new OrdersModel({
            orderDate: orderDate,
            status: status,
            totalAmount: totalAmount
        });
        await data.save();
    }
    res.json({
        msg: orderid ? "Order updated successfully!" : "Added successfully",
        data: data
    });
};

const deleteorder = async (req, res) => {
    let id = req.params.id;
    let data = await OrdersModel.findByIdAndDelete(id);
    if (data) {
        res.json({ msg: "order deleted successfully!" });
    } else {
        res.status(404).json({ msg: "order not found!" });
    }
};

const editorder = async (req, res) => {
    let id = req.params.id;
    let data = await OrdersModel.findById(id);
    if (data) {
        res.json({ data: data, msg: "Order fetched successfully!" });
    } else {
        res.status(404).json({ msg: "Order not found!" });
    }
};

module.exports = { orderlist, addorder, deleteorder, editorder };