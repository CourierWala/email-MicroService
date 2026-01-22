require("dotenv").config();

const { Worker } = require("bullmq");
const { connection } = require("../config/queue.config");
const emailService = require("../services/email.service");

const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    const { to, subject, message } = job.data;
    await emailService.sendEmail(to, subject, message);
  },
  { connection },
);

emailWorker.on("completed", (job) => {
  console.log(`Email job ${job.id} completed`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Email job ${job.id} failed:`, err.message);
});
