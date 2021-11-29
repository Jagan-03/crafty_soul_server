const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    list_items: [],
    customer : {},
    shipping : {},
    order_price : Number,
    payment : {},
}) 

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
