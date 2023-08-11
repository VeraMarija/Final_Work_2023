const Joi = require("joi");

module.exports = {
  register: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(5).max(128),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }),
  },

  login: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().max(128),
    }),
  },

  refresh: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      refreshToken: Joi.string().required(),
    }),
  },

  sendPasswordReset: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  },

  passwordReset: {
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(5).max(128),
      resetToken: Joi.string().required(),
    }),
  },
};
