const Joi = require('joi');

const {EMAIL, PASSWORD} = require('../constants/regex.enum');
const {statusCode} = require('../constants');
const {ApiError} = require('../errors');

const nameValidator = Joi.string().alphanum()
  .min(2)
  .max(32)
  .trim();
const ageValidator = Joi.number().integer()
  .min(1)
  .max(120);
const emailValidator = Joi.string().regex(EMAIL)
  .lowercase()
  .trim()
  .error(new ApiError('Email not valid', statusCode.BAD_REQUEST));
const passwordValidator = Joi.string().regex(PASSWORD)
  .error(new ApiError('Password not valid', statusCode.BAD_REQUEST));


const newUserValidator = Joi.object({
  name: nameValidator.required(),
  age: ageValidator,
  email: emailValidator.required(),
  password: passwordValidator.required(),

});

const updateUserValidator = Joi.object({
  name: nameValidator,
  age: ageValidator,
  email: emailValidator,

});

const loginUserValidator = Joi.object({
  email: emailValidator.required().error(new ApiError('Wrong email or password', statusCode.BAD_REQUEST)),
  password: passwordValidator.required().error(new ApiError('Wrong email or password', statusCode.BAD_REQUEST)),
});

const userEmailValidator = Joi.object({
  email: emailValidator.required().error(new ApiError('Wrong email', statusCode.BAD_REQUEST)),
});

const userPasswordValidator = Joi.object({
  password: passwordValidator.required().error(new ApiError('Wrong password', statusCode.BAD_REQUEST)),
});

module.exports = {
  loginUserValidator,
  newUserValidator,
  updateUserValidator,
  userEmailValidator,
  userPasswordValidator
};
