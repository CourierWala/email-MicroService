require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.send("Email Service is running");
});

app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "courierwalaorg@gmail.com",
      to,
      subject,
      text: message,
    });

    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Email service running on port ${PORT}`);
});
