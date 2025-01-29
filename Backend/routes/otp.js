/*const express = require("express");
const router = express.Router();
const { sendWhatsAppMessage } = require("../utils/whatsapp");
const { sendEmailUsingGmail } = require("../utils/email");

router.post("/send-otp", async (req, res) => {
  const { phoneNumber, emailAddress } = req.body;

  if (!phoneNumber || !emailAddress) {
    return res.status(400).json({ error: "Both phone number and email address are required" });
  }

  try {
    // Try sending OTP via WhatsApp
    sendWhatsAppMessage(phoneNumber, async (error, data) => {
      if (error) {
        console.error("Error sending OTP via WhatsApp:", error);
        console.log("Sending OTP via email");

        try {
          await sendEmailUsingGmail(emailAddress);
          return res.status(200).json({ message: "OTP sent successfully via email" });
        } catch (emailError) {
          console.error("Error sending OTP via email:", emailError);
          return res.status(500).json({ error: "Failed to send OTP via email" });
        }
      }

      return res.status(200).json({ message: "OTP sent successfully via WhatsApp", data });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
});

module.exports = router;*/
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { sendWhatsAppMessage } = require("../utils/whatsapp");
const { sendEmailUsingGmail } = require("../utils/email");

const FILE_PATH = path.join(__dirname, "phoneNumber.txt");

// Function to check if phone number exists
const phoneNumberExists = (phoneNumber) => {
  if (!fs.existsSync(FILE_PATH)) return false; // If file doesn't exist, number doesn't exist
  const fileContent = fs.readFileSync(FILE_PATH, "utf-8");
  const phoneNumbers = new Set(fileContent.split("\n").filter(Boolean));
  return phoneNumbers.has(phoneNumber);
};

// Function to append phone number to file
const addPhoneNumberToFile = (phoneNumber) => {
  fs.appendFileSync(FILE_PATH, `${phoneNumber}\n`);
};

router.post("/send-otp", async (req, res) => {
  const { phoneNumber, emailAddress } = req.body;

  if (!phoneNumber || !emailAddress) {
    return res.status(400).json({ error: "Both phone number and email address are required" });
  }

  if (phoneNumberExists(phoneNumber)) {
    return res.status(400).json({ error: "Phone number already exists" });
  }

  try {
    // Try sending OTP via WhatsApp
    sendWhatsAppMessage(phoneNumber, async (error, data) => {
      if (error) {
        console.error("Error sending OTP via WhatsApp:", error);
        console.log("Attempting to send OTP via email...");

        try {
          await sendEmailUsingGmail(emailAddress);
          addPhoneNumberToFile(phoneNumber); // Append only after successful email OTP
          return res.status(200).json({ message: "OTP sent successfully via email" });
        } catch (emailError) {
          console.error("Error sending OTP via email:", emailError);
          return res.status(500).json({ error: "Failed to send OTP via email" });
        }
      }

      addPhoneNumberToFile(phoneNumber); // Append only after successful WhatsApp OTP
      return res.status(200).json({ message: "OTP sent successfully via WhatsApp", data });
    });
  } catch (error) {
    console.error("Error processing request:", error.message);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
});

module.exports = router;
