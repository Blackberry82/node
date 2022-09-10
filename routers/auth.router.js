const {Router} = require('express');

const {authController} = require('../controllers');
const {userMdwr, authMdwr, commonMdwr} = require('../middlewares');
const {
    loginUserValidator,
    userEmailValidator,
    userPasswordValidator
} = require('../validator/user.validators');

const {tokenTypeEnum} = require('../constants');

const authRouter = Router();

authRouter.post(
  '/login',
  commonMdwr.checkIsBodyValid(loginUserValidator),
  userMdwr.getUserDinamicaly('body', 'email', 'email'),
  authController.login
);
authRouter.post(
  '/logout',
  authMdwr.checkIsAccessToken,
  authController.logout
);
authRouter.post(
  '/refresh',
  authMdwr.checkIsRefreshToken,
  authController.refresh,
);
authRouter.post(
  '/password/forgot',
  commonMdwr.checkIsBodyValid(userEmailValidator),
  userMdwr.getUserDinamicaly('body', 'email'),
  authController.forgotPassword,
);
authRouter.put(
  '/password/forgot',
  commonMdwr.checkIsBodyValid(userPasswordValidator),
  authMdwr.checkActionToken(tokenTypeEnum.FORGOT_PASSWORD),
  authMdwr.checkPreviousPassword,
  authController.setNewPasswordForgot,
);

module.exports = authRouter;
