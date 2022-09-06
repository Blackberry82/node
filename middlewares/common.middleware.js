const {isObjectIdOrHexString} = require('mongoose');

const statusCode = require('../constants/statusCode');
const ApiError = require('../errors/ApiError');

module.exports = {
  checkIsIdValid: (fieldName, from = 'params') => (req, res, next) => {
    try {

      if (!isObjectIdOrHexString(req[from][fieldName])) {
        return next(new ApiError('Not valid ID', statusCode.BAD_REQUEST));
      }
      next();
    } catch (e) {
      next(e);
    }
  },

  checkIsBodyValid: (validatorType) => (req, res, next) => {
    try {
      const validate = validatorType.validate(req.body);

      if (validate.error) {
        return next(new ApiError(validate.error.message, statusCode.BAD_REQUEST));
      }
      req.body = validate.value;
      next();
    }catch (e){
      next(e);
    }
  },
};
