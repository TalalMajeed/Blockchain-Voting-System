/*const express = require("express");
const { otpStore } = require("./otp");
const router = express.Router();

router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;
  const phoneNumber = req.session.phoneNumber; // ✅ Retrieve stored phone number

  if (!phoneNumber) {
    return res.status(400).json({ error: "Phone number session expired. Please resend OTP." });
  }

  const storedOtp = otpStore.get(phoneNumber);

  if (!storedOtp) {
    return res.status(400).json({ error: "OTP expired or not found." });
  }

  if (otp !== storedOtp) {
    return res.status(400).json({ error: "Invalid OTP. Try again." });
  }

  // OTP is correct, remove it from store
  otpStore.delete(phoneNumber);
  req.session.destroy(); // ✅ Clear session after successful verification

  return res.status(200).json({ message: "OTP verified successfully!" });
});

module.exports = router;
*/
const express = require("express");
const router = express.Router();
const { otpStore } = require("./otp"); 

router.post("/verify-otp", (req, res) => {
  const { otp } = req.body; 
  const phoneNumber = req.session.phoneNumber; 

  if (!phoneNumber) {
    return res.status(400).json({ error: "Session expired or phone number not found" });
  }

  if (!otp) {
    return res.status(400).json({ error: "OTP is required" });
  }

  console.log("Stored OTPs:", otpStore);
    console.log(`Looking for OTP for phone number: ${phoneNumber}`);

  const storedOtp = otpStore.get(phoneNumber); 
  if (!storedOtp) {
    return res.status(400).json({ error: "OTP expired or not found" });
  }

  if (storedOtp === otp) {
    otpStore.delete(phoneNumber); 
    return res.status(200).json({ message: "OTP verified successfully!" });
  } else {
    return res.status(400).json({ error: "Invalid OTP" });
  }
});

module.exports = router;
