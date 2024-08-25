const joi = require("joi");

const createPassenger = joi.object({
  booking_id: joi.string().required(),
  customer_id: joi.string().required(),
  title: joi.string().required(),
  full_name: joi.string().required(),
  nationality: joi.string().required(),
});

const updatePassenger = joi.object({
  booking_id: joi.string(),
  customer_id: joi.string(),
  title: joi.string(),
  full_name: joi.string(),
  nationality: joi.string(),
});

module.exports = {
  createPassenger,
  updatePassenger,
};
