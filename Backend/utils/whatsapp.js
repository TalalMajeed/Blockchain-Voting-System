function sendWhatsAppMessage(phoneNumber, callback) {
    const url = "https://graph.facebook.com/v21.0/569982299523772/messages";
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const sendText = `${randomNumber}`;

    const headers = {
        Authorization:
            "Bearer EAAIbRMn3t34BOzfwx8Bh7FPn9HZC1iODVgbZBNG3vDtK9cYlboG4IwqbZAxnKOgVxJZCpN6oetawBAa0uJYUhzvp3ikRzAVaZAlVbl2jzp4IrTQ5p8C3nSSJkIs3rP9uLRi5bk6uEiLeRMYcJUEP7ZCAEIzmjzIiSBnpa8LRSzQCGpOC4mtWvbSzrbQgoLkpvcfxCnzSKPYTfT4i6dWt8YHmJlz7d9HzWhunUZD",
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