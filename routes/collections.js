const express = require("express");
const router = express.Router();

// Models
const Collection = require("../models/collection.js");

router.get("/", async (req, res) => {
  try {
      const data = await Collection.find({});
      res.send(data);        
    } catch (error) {
      console.log(error);
    }
});

router.post("/", async(req, res) => {
    try {
        const collections = req.body;
        collections.map(async (collection) => {
            const newCollection = new Collection(collection);
            await newCollection.save();
        })
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;

