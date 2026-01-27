"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const otpWorker_1 = require("../workers/otpWorker");
const email_1 = require("../utils/email");
const whatsapp_1 = require("../utils/whatsapp");
const User_1 = require("../models/User");
router.post("/", async (req, res) => {
    const { email, phone } = req.body;
    let mode = "whatsapp";
    if (!email || !phone) {
        return res.status(400).json({ error: "Email and Phone Required" });
    }
    const existingUser = await User_1.User.findOne({
        $or: [{ email: email.toLowerCase() }, { phone }],
    }).lean();
    if (existingUser) {
        return res.status(400).json({ error: "Voter already exists" });
    }
    let otp = "";
    try {
        otp = (await (0, otpWorker_1.storeOTP)({ email, phone }));
    }
    catch (error) {
        return res.status(500).json({ error: "Error storing OTP" });
    }
    try {
        await (0, whatsapp_1.sendWhatsAppMessage)(phone, otp);
    }
    catch (error) {
        try {
            mode = "email";
            await (0, email_1.sendMail)(email, otp);
        }
        catch (error) {
            console.log("Error sending OTP via email:", error);
            return res.status(500).json({ error: "Error sending OTP" });
        }
    }
    return res.status(200).json({ message: `OTP sent via ${mode}`, mode: mode });
});
exports.default = router;
