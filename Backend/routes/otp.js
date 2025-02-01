/*const express = require("express");
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

module.exports = router;*/
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { sendWhatsAppMessage } = require("../utils/whatsapp");
const { sendEmailUsingGmail } = require("../utils/email");

const FILE_PATH = path.join(__dirname, "phoneNumber.txt");
const otpStore = new Map();

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const phoneNumberExists = (phoneNumber) => {
  if (!fs.existsSync(FILE_PATH)) return false;
  const fileContent = fs.readFileSync(FILE_PATH, "utf-8");
  const phoneNumbers = new Set(fileContent.split("\n").filter(Boolean));
  return phoneNumbers.has(phoneNumber);
};

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

  const otp = generateOTP();
  otpStore.set(phoneNumber, otp);
  req.session.phoneNumber = phoneNumber;

  console.log(`Generated OTP for ${phoneNumber}: ${otp}`);

  try {
    sendWhatsAppMessage(phoneNumber, otp, async (error, data) => {
      if (error) {
        console.error("Error sending OTP via WhatsApp:", error);
        console.log("Attempting to send OTP via email...");

        try {
          await sendEmailUsingGmail(emailAddress, otp);
          addPhoneNumberToFile(phoneNumber);
          return res.status(200).json({ message: "OTP sent successfully via email" });
        } catch (emailError) {
          console.error("Error sending OTP via email:", emailError);
          return res.status(500).json({ error: "Failed to send OTP via email" });
        }
      }

      addPhoneNumberToFile(phoneNumber);
      return res.status(200).json({ message: "OTP sent successfully via WhatsApp", data });
    });
  } catch (error) {
    console.error("Error processing request:", error.message);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
});

router.get("/get-phone-number", (req, res) => {
  if (req.session.phoneNumber) {
    return res.json({ phoneNumber: req.session.phoneNumber });
  }
  return res.status(400).json({ error: "Phone number not found" });
});

module.exports = {otpStore, router}; 
