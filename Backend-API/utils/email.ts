import nodemailer from "nodemailer";

async function sendMail(to: string, otp: string) {
  const user = process.env.SMTP_EMAIL;
  const pass = process.env.SMTP_PASSWORD;
  const host = process.env.SMTP_HOST;
  const subject = "OTP verification";
  const text = `Your OTP is: ${otp}`;
  try {
    const transporter = nodemailer.createTransport({
      host,
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: user,
      to,
      subject,
      text,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

export { sendMail };
