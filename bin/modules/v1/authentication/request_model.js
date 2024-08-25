const joi = require("joi");

const signIn = joi.object({
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  password: joi.string().required(),
});

const refreshToken = joi.object({
  refresh_token: joi.string().required(),
});

module.exports = {
  refreshToken,
  signIn,
};
