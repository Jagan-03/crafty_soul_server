const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
    collection_id: Number,
    name : String,
    products : [],
    thumbnail : String
}) 

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
