const express = require("express");
const router = express.Router();

const { emailQueue } = require("../config/queue.config");
const { sendEmailSchema } = require("../validators/email.validator");

// const emailService = require("../services/email.service");
// const { sendEmailSchema } = require("../validators/email.validator");

router.post("/send", async (req, res) => {
  const { error, value } = sendEmailSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  await emailQueue.add("send-email", value);

  res.status(202).json({
    success: true,
    message: "Email request accepted for processing",
  });
});

module.exports = router;
