const Joi = require('joi');

const yearValidator = Joi.number().integer()
  .min(1990)
  .max(new Date().getFullYear());
const modelValidator = Joi.string().alphanum()
  .min(2)
  .max(32)
  .trim();

const newCarValidator = Joi.object({
  model: modelValidator.required(),
  year: yearValidator.required(),
});

const updateCarValidator = Joi.object({
  model: modelValidator,
  year: yearValidator,
});

module.exports = {
  newCarValidator,
  updateCarValidator,
};
