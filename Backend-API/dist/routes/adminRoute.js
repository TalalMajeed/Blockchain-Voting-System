"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.post("/", (req, res) => {
    const { wallet } = req.body;
    if (!wallet) {
        return res.status(400).json({ error: "Admin Wallet Required" });
    }
    if (wallet === process.env.ADMIN_WALLET) {
        return res.status(200).json({ message: "Admin Wallet Verified" });
    }
    else {
        return res.status(400).json({ error: "Invalid Admin Wallet" });
    }
});
exports.default = router;
