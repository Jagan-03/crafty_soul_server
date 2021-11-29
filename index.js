require("dotenv").config();

const express = require('express');
const cors = require("cors");
const mongo = require("./mongo.js");

// Importing routes
const register = require("./routes/register.js");
const login = require("./routes/login.js");
const getCollection = require("./routes/collections.js");
const cartRoutes = require("./routes/cart.js");
const orderRoutes = require("./routes/order.js");

const app = express();

// Using cors
app.use(cors());

// Parsing request body as JSON format
app.use(express.json());
// Initializing passport

(async () => {
    try {
        // Mongodb Connection
        await mongo.connect();
        // Routes
        app.use("/register", register);
        app.use("/login", login);
        app.use("/collections", getCollection);
        app.use("/cart", cartRoutes);
        app.use("/orders", orderRoutes);
    } catch (error) {
        console.log(error);
    }
})();
app.listen(process.env.PORT || 3001, () => console.log("Listening on PORT 3001"));
