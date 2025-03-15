async function sendWhatsAppMessage(phoneNumber: string, otp: string) {
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

  const response = await fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  const json = await response.json();
  if (json.error) {
    console.error("Error sending message:", json.error);
    throw new Error(json.error);
    return;
  }
  console.log("Message sent successfully:", data);
  return 0;
}

export { sendWhatsAppMessage };
