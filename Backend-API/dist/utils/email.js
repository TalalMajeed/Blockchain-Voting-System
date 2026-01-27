"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
async function sendMail(to, otp) {
    const user = process.env.SMTP_EMAIL;
    const pass = process.env.SMTP_PASSWORD;
    const host = process.env.SMTP_HOST;
    const subject = "OTP verification";
    const text = `Your OTP is: ${otp}`;
    try {
        const transporter = nodemailer_1.default.createTransport({
            host,
            auth: {
                user,
                pass,
            },
        });
        await transporter.sendMail({
            from: user,
            to,
            subject,
            text,
        });
        console.log("Email sent successfully!");
    }
    catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
}
