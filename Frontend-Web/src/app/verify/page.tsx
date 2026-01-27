/*import { useState, useEffect } from "react";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }), // ✅ No need to send phoneNumber
        credentials: "include", // ✅ Ensure session data is sent
      });

      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Error verifying OTP. Try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Enter OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ padding: "10px", marginBottom: "10px", display: "block" }}
      />
      <button onClick={handleVerify} style={{ padding: "10px 20px" }}>
        Verify OTP
      </button>
      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
}*/
"use client";
import { useState, useEffect } from "react";

export default function Verify() {
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/get-phone-number", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.phoneNumber) {
          setPhoneNumber(data.phoneNumber);
        } else {
          setMessage("Phone number not found, please try again.");
        }
      })
      .catch(() => setMessage("Error fetching phone number."));
  }, []);

  const handleVerify = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
        credentials: "include",
      });

      const data = await response.json();
      setMessage(data.message || data.error);
    } catch (error) {
      setMessage("Error verifying OTP. Try again.");
    }
  };

  return (
    <div>
      <h2>Enter OTP</h2>
      <input type="text" value={phoneNumber} disabled style={{ backgroundColor: "#ddd" }} />
      <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
      <button onClick={handleVerify}>Verify OTP</button>
      {message && <p>{message}</p>}
    </div>
  );
}