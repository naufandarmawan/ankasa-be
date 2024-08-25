const joi = require("joi");

const create = joi.object({
  email: joi.string().required(),
  full_name: joi.string().required(),
  password: joi.string().required(),
});

module.exports = {
  create,
};
