const mongoose = require('mongoose');

const schema = mongoose.Schema;

const OrderSchema = new schema({
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Canceled']
    },
    totalAmount: {
        type: Number
    }
});

const OrdersModel = mongoose.model("Orders", OrderSchema);

module.exports = OrdersModel; 