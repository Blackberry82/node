const {isObjectIdOrHexString} = require('mongoose');

const statusCode = require('../constants/statusCode');
const ApiError = require('../errors/ApiError');

module.exports = {
    checkIsIdValid: (fieldName, from = 'params') => {
        return async (req, res, next) => {
            try {
                req.params.userId
                if (!isObjectIdOrHexString(req[from][fieldName])) {
                    return next(new ApiError('Not valid ID', statusCode.BAD_REQUEST));
                }
                next();
            } catch (e) {
                next(e);
            }
        }
    }
}
