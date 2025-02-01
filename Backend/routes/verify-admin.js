
//const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
require('dotenv').config();

router.post("/verify-admin", (req, res) => {
    console.log("Received body:", req.body); // Debugging line
    console.log("Env username:", process.env.ADMIN_USERNAME);
    console.log("Env password:", process.env.ADMIN_PASSWORD);

    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: "Admin username and password are required" });
    }

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        return res.status(200).json({ message: "OTP verified successfully!" });
    } else {
        return res.status(400).json({ error: "Invalid admin username or password" });
    }
});
module.exports = router;