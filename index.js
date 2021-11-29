require("dotenv").config();

const express = require('express');
const cors = require("cors");
const mongo = require("./mongo.js");
const session = require("express-session");
const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Importing Mongoose Models
const User = require("./models/user.js");

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

app.use(passport.initialize());

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "https://localhost:3001/auth/google/crafty_soul",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

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
