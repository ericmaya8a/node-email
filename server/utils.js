const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASS
  }
});

module.exports = {
  sendEmail: async (emailConfig, res) => {
    const { to, subject, text, html } = emailConfig;
    const info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to,
      subject,
      text,
      html
    });
    console.log(`Message sent: ${info.messageId}`);
    res.status(200).json({ result: 0, message: info.messageId });
  }
};
