const Joi = require("joi");

const loginRoles = {
  email: Joi.string().email().min(5).max(250).trim().required(),
  password: Joi.string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$")
    )
    .required(),
};

const registerRoles = {
  ...loginRoles,
  firstname: Joi.string()
    .min(2)
    .max(250)
    .alphanum()
    .trim()
    .regex(new RegExp("^[A-Z][a-zA-Z0-9]+$"))
    .required(),
  lastname: Joi.string()
    .min(2)
    .max(250)
    .alphanum()
    .trim()
    .regex(new RegExp("^[A-Z][a-zA-Z0-9]+$"))
    .required(),
  isAdmin: Joi.boolean().required(),
  phone: Joi.string().min(7).max(10),
  likes: Joi.array(),
};

const registerSchema = Joi.object(registerRoles);
const loginSchema = Joi.object(loginRoles);

module.exports = {
  registerSchema,
  loginSchema,
};
