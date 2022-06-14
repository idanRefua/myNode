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

const editUserDetails = {
  email: Joi.string().email().min(5).max(250).trim().required(),
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
};

const editPasswordRoles = {
  currentPassword: Joi.string().regex(
    new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$")
  ),
  newPassword: Joi.string().regex(
    new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$")
  ),
  newPassword2: Joi.string().regex(
    new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{6,}$")
  ),
};

const registerSchema = Joi.object(registerRoles);
const loginSchema = Joi.object(loginRoles);
const editDetailsSchema = Joi.object(editUserDetails);
const changePasswordSchema = Joi.object(editPasswordRoles);

module.exports = {
  registerSchema,
  loginSchema,
  editDetailsSchema,
  changePasswordSchema,
};
