const {Router} = require('express');

const {authController} = require('../controllers');
const {userMdwr, authMdwr, commonMdwr} = require('../middlewares');
const {loginUserValidator} = require('../validator/user.validators');

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

module.exports = authRouter;
