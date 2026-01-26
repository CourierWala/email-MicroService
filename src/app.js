const express = require("express");
const cors = require("cors");

const emailRoutes = require("./routes/email.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.send("Email Service is running");
});

app.use("/api/email", emailRoutes);

module.exports = app;
