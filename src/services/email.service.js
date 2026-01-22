const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail.config');

const transporter = nodemailer.createTransport(mailConfig);

async function sendEmail(to, subject, message) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message
  });
}

module.exports = {
  sendEmail
};
