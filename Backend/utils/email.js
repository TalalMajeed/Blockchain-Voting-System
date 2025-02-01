const nodemailer = require('nodemailer');

async function sendEmailUsingGmail(to, otp) {
  const user = "m.talal.majeed@gmail.com";
  const pass = "vbmi dumc mvkq lznr";
  const subject = "OTP verification"; 
  //const randomNumber = Math.floor(100000 + Math.random() * 900000);
    //const text = `Your OTP is: ${randomNumber}`;
    const text = `Your OTP is: ${otp}`;
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
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

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}


module.exports = { sendEmailUsingGmail };