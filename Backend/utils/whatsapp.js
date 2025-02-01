function sendWhatsAppMessage(phoneNumber, otp, callback) {
    const url = "https://graph.facebook.com/v21.0/569982299523772/messages";
    //const randomNumber = Math.floor(100000 + Math.random() * 900000);
    //const sendText = `${randomNumber}`;
    const sendText = `${otp}`;

    const headers = {
        Authorization:
            "Bearer EAAIbRMn3t34BO7128vOmwXCJOUSUFH7D9KIKC4ttZAPgEqQfqnQTKIDKPNZBLjtAUHZC8dMpgXoAMpGrqC2wYWB7rX8RkyvYKBW7rz61uS6hvdy2BLwBTwNO2oza502XklkPOiAfQNbnpUA4CtKyaWpjZBrddJlP69Vjib48DYSR88qZATZBjr3jsBr8nRb4rn3hGiRtZA2zTZA1mm20WxAuGDSpZBMdxFuWJh3eW",
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
            console.log("Message sent successfully:", data);
            if (callback) {
                callback(null, data);
            }
        })
        .catch((error) => {
            console.error("Error sending message:", error);
            if (callback) {
                callback(error, null);
            }
        });
}
module.exports = { sendWhatsAppMessage };