import { Router } from "express";
import express from "express";
import { verifyOTP } from "../workers/otpWorker.ts";
import { User } from "../models/User.ts";

const router: Router = express.Router();

interface RequestBody {
  email: string;
  phone: string;
  code: string;
}

router.post("/", async (req, res) => {
  const { email, phone, code } = req.body as RequestBody;

  if (!email || !phone || !code) {
    return res.status(400).json({ error: "Email, Phone and Code Required" });
  }

  const status = await verifyOTP(code, { email, phone });
  console.log("status", status);

  if (status) {
    try {
      await User.create({ email, phone });

      return res.status(200).json({ message: "OTP Verified" });
    } catch (error) {
      console.error("Database Error:", error);
      if (typeof error === "object" && error && "code" in error) {
        if ((error as { code?: unknown }).code === 11000) {
          return res.status(400).json({ error: "Voter already exists" });
        }
      }
      return res.status(500).json({ error: "Error Saving Data" });
    }
  } else {
    return res.status(400).json({ error: "Invalid OTP" });
  }
});

export default router;
