const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", async (req, res) => {
    try {
        await passport.authenticate("google", { scope: ["profile"] });
        console.log("recived")
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;