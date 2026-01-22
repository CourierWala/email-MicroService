const express = require('express');

const emailRoutes = require('./routes/email.routes');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('Email Service is running');
});

app.use('/api/email', emailRoutes);

module.exports = app;
