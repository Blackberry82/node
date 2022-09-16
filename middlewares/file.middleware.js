const {ApiError} = require('../errors');
const {statusCode, fileConstants} = require('../constants');

module.exports = {
  checkUploadedAvatar: (req, res, next) => {
    try {
        console.log(req.files);
      if (!req.files || !req.files.avatar) {
        return next(new ApiError('You have not avatar', statusCode.BAD_REQUEST));
      }
      const {avatar} = req.files;

      if (avatar.size > fileConstants.IMAGE_MAX_SIZE) {
        return next(new ApiError('File is too big', statusCode.BAD_REQUEST));
      }
      if (!fileConstants.IMAGES_MIMETYPES.includes(avatar.mimetype)) {
        return next(new ApiError('Wrong type of file', statusCode.BAD_REQUEST));
      }

      next();
    }catch (e) {
      next(e);
    }
  }
};
