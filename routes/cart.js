const express = require("express");
const router = express.Router();

// Models
const Cart = require("../models/cart.js");

router.get("/", async (req, res) => {
  try {
      const data = await Cart.find({});
      res.send(data);        
    } catch (error) {
      console.log(error);
    }
});

router.post("/", async(req, res) => {
    try {
        const cart = req.body;
        const item = await Cart.find({user_id : req.body.user_id, name : req.body.name, description : req.body.description}).exec();
        if(item.length > 0){
          await Cart.findOneAndUpdate({user_id : req.body.user_id, name : req.body.name, description : req.body.description}, { $inc: { quantity : 1 }});
          res.send("UPDATE");
        } else {
          const newCartItem = new Cart(cart);
          await newCartItem.save();
          res.send("ADD");
        }
    } catch (error) {
        console.log(error);
    }
})

router.patch("/", async(req, res) => {
  try {
      const item = req.body;
      if(item.quantity > 1) {
        await Cart.findOneAndUpdate({user_id : req.body.user_id, name : req.body.name, description : req.body.description}, { $inc: { quantity : -1 }});
        res.send("CART REDUCED");
      } else {
        await Cart.findOneAndDelete({user_id : req.body.user_id, name : req.body.name, description : req.body.description});
        res.send("CART DELETED");
      }
  } catch (error) {
    console.log(error);
  }
})

router.delete("/", async(req, res) => {
  try {
      await Cart.deleteMany({});
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;

