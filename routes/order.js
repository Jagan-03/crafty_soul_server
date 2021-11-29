const express = require("express");
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;

// Models
const Order = require("../models/order.js");

router.get("/", async (req, res) => {
  try {
    const data = await Order.find({});
    res.send(data);        
    } catch (error) {
      console.log(error);
    }
});

router.post("/", async(req, res) => {
    try {
        const order = req.body;
        const newOrder = new Order(order);
        const data = await newOrder.save();
        res.send({...data, _id : ObjectID(data._id)});
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;

