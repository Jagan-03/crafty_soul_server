const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id: String,
    name : String,
    quantity : Number,
    image : String,
    description : String,
    price : Number
}) 

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
