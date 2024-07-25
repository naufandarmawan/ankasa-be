const joi = require('joi');

const getProfile = joi.object({
  email: joi.string().required(),
});
const deleteUser = joi.object({
  email: joi.string().required(),
  id: joi.required()
});
const updateProfile = joi.object({
  email: joi.string().required(),
  fullname: joi.string().required(),
  photo: joi.object().optional(),
  size: joi.number().max(10000000).optional(),
  ext: joi.string().valid('jpg','jpeg','png','svg','gif').optional()
});

const changePassword = joi.object({
  email: joi.string().required(),
  old_password: joi.string().required(),
  new_password: joi.string().required(),
});

const getUsers = joi.object({
  limit: joi.number().optional().default(999999999),
  page: joi.number().optional().default(1),
  sortBy: joi.string().valid('createdAt','updatedAt').optional().default('createdAt'),
  order: joi.string().valid('ASC','DESC').optional().default('ASC')
});

const create = joi.object({
  email: joi.string().required(),
  fullname: joi.string().required(),
  password: joi.string().required(),
  role: joi.string().valid('admin','user').required(),
  division_id: joi.string().optional()
});

const update = joi.object({
  id_user: joi.string().required(),
  email: joi.string().required(),
  fullname: joi.string().required(),
  password: joi.string().optional(),
  role: joi.string().valid('admin','user').required(),
  division_id: joi.string().optional()
});

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  getUsers,
  create,
  update,
  deleteUser
};
