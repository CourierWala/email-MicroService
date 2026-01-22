const Joi = require("joi");

const sendEmailSchema = Joi.object({
  to: Joi.string().email().required(),
  subject: Joi.string().min(3).max(100).required(),
  message: Joi.string().min(1).required(),
});

module.exports = {
  sendEmailSchema,
};
