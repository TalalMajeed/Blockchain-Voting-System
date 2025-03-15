import { Router } from "express";
import express from "express";
import db from "../database/setup.ts";
import { verifyOTP } from "../workers/otpWorker.ts";

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
      const stmt = db.prepare(
        "UPDATE users SET verified = 1 WHERE email = ? OR phone = ?"
      );
      const result = stmt.run(email, phone);

      if (result.changes === 0) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json({ message: "OTP Verified" });
    } catch (error) {
      console.error("Database Error:", error); // Logs error for debugging
      return res.status(500).json({ error: "Error Saving Data" });
    }
  } else {
    return res.status(400).json({ error: "Invalid OTP" });
  }
});

export default router;
