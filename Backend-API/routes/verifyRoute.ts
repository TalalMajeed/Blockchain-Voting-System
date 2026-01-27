import { Router } from "express";
import express from "express";

const router: Router = express.Router();

import { storeOTP } from "../workers/otpWorker";
import { sendMail } from "../utils/email";
import { sendWhatsAppMessage } from "../utils/whatsapp";
import { User } from "../models/User";

interface RequestBody {
  email: string;
  phone: string;
}

router.post("/", async (req, res) => {
  const { email, phone } = req.body as RequestBody;
  let mode = "whatsapp";

  if (!email || !phone) {
    return res.status(400).json({ error: "Email and Phone Required" });
  }

  const existingUser = await User.findOne({
    $or: [{ email: email.toLowerCase() }, { phone }],
  }).lean();

  if (existingUser) {
    return res.status(400).json({ error: "Voter already exists" });
  }

  let otp: string = "";
  try {
    otp = (await storeOTP({ email, phone })) as string;
  } catch (error) {
    return res.status(500).json({ error: "Error storing OTP" });
  }

  try {
    await sendWhatsAppMessage(phone, otp);
  } catch (error) {
    try {
      mode = "email";
      await sendMail(email, otp);
    } catch (error) {
      console.log("Error sending OTP via email:", error);
      return res.status(500).json({ error: "Error sending OTP" });
    }
  }

  return res.status(200).json({ message: `OTP sent via ${mode}`, mode: mode });
});

export default router;
