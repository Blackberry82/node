const {Router} = require('express');

const userController = require('../controllers/user.controller');
const {commonMdwr, userMdwr, authMdwr, fileMdwr} = require('../middlewares');
const {newUserValidator, updateUserValidator} = require('../validator/user.validators');

const userRouter = Router();

userRouter.get(
  '/',
  userController.getAllUsers
);

userRouter.post(
  '/',
  commonMdwr.checkIsBodyValid(newUserValidator),
  userMdwr.checkIsUserEmailUniq,
  userController.createUser
);

userRouter.get(
  '/:userId',
  commonMdwr.checkIsIdValid('userId'),
  userMdwr.isUserPresent(),
  userController.getUserById
);

userRouter.get(
    '/:userId/avatar',
    commonMdwr.checkIsIdValid('userId'),
    userMdwr.isUserPresent(),
    userController.getImages
);

userRouter.post(
    '/:userId/avatar',
    commonMdwr.checkIsIdValid('userId'),
    fileMdwr.checkUploadedAvatar,
    userMdwr.isUserPresent(),
    userController.uploadAvatar
);

userRouter.delete(
    '/:userId/avatar/:imageId',
    commonMdwr.checkIsIdValid('userId'),
    commonMdwr.checkIsIdValid('imageId'),
    userMdwr.isUserPresent(),
    userController.deleteImages
);


userRouter.put(
  '/:userId',
  commonMdwr.checkIsIdValid('userId'),
  commonMdwr.checkIsBodyValid(updateUserValidator),
  authMdwr.checkIsAccessToken,
  userMdwr.isUserPresent(),
  userMdwr.checkIsUserEmailUniq,
  userController.updateUserById
);

userRouter.delete(
  '/:userId',
  commonMdwr.checkIsIdValid('userId'),
  authMdwr.checkIsAccessToken,
  userMdwr.isUserPresent(),
  userController.deleteUserById
);

module.exports = userRouter;
