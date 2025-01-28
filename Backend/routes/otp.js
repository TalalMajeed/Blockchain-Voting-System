const express = require("express");
const router = express.Router();
const { sendWhatsAppMessage } = require("../utils/whatsapp");
const { sendEmailUsingGmail } = require("../utils/email");

router.post("/send-otp", async (req, res) => {
  const { phoneNumber, emailAddress } = req.body;

  if (!phoneNumber && !emailAddress) {
    return res.status(400).json({ error: "firsterror" });
  }

  try {
    if (phoneNumber && !emailAddress) {
      sendWhatsAppMessage(phoneNumber, (error, data) => {
        if (error) {
          console.error("Error sending OTP via WhatsApp:", error);
          return res.status(500).json({ error: "Failed to send OTP via WhatsApp" });
        }
        return res.status(200).json({ message: "OTP sent successfully via WhatsApp", data });
      });
    } else if (emailAddress && !phoneNumber) {
      await sendEmailUsingGmail(emailAddress);
      return res.status(200).json({ message: "OTP sent successfully via email" });
    }
    else{
        sendWhatsAppMessage(phoneNumber, (error, data) => {
            if (error) {
              console.error("Error sending OTP via WhatsApp:", error);
              return res.status(500).json({ error: "Failed to send OTP via WhatsApp" });
            }
            return res.status(200).json({ message: "OTP sent successfully via WhatsApp", data });
          });
    }
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
});

module.exports = router;