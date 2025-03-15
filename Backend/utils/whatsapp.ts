function sendWhatsAppMessage(phoneNumber: string, otp: string) {
  const url = "https://graph.facebook.com/v21.0/569982299523772/messages";
  const sendText = `${otp}`;

  const headers = {
    Authorization: `Bearer ${process.env.WHATSAPP_SECRET}`,
    "Content-Type": "application/json",
  };

  const data = {
    messaging_product: "whatsapp",
    to: phoneNumber,
    type: "template",
    template: {
      name: "otp_verification",
      language: { code: "en" },
      components: [
        {
          type: "body",
          parameters: [{ type: "text", text: sendText }],
        },
        {
          type: "button",
          sub_type: "url",
          index: 0,
          parameters: [
            {
              type: "text",
              text: sendText,
            },
          ],
        },
      ],
    },
  };

  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      //Check if it contains the error key
      if (data.error) {
        console.error("Error sending message:", data.error);
        throw new Error(data.error);
        return;
      }
      console.log("Message sent successfully:", data);
    })
    .catch((error) => {
      console.log("Sending Email OTP");
      throw new Error(error);
    });
}

export { sendWhatsAppMessage };
