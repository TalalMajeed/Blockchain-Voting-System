"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const otpWorker_1 = require("../workers/otpWorker");
const User_1 = require("../models/User");
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    const { email, phone, code } = req.body;
    if (!email || !phone || !code) {
        return res.status(400).json({ error: "Email, Phone and Code Required" });
    }
    const status = await (0, otpWorker_1.verifyOTP)(code, { email, phone });
    console.log("status", status);
    if (status) {
        try {
            await User_1.User.create({ email, phone });
            return res.status(200).json({ message: "OTP Verified" });
        }
        catch (error) {
            console.error("Database Error:", error);
            if (typeof error === "object" && error && "code" in error) {
                if (error.code === 11000) {
                    return res.status(400).json({ error: "Voter already exists" });
                }
            }
            return res.status(500).json({ error: "Error Saving Data" });
        }
    }
    else {
        return res.status(400).json({ error: "Invalid OTP" });
    }
});
exports.default = router;
