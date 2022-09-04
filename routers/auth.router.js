const {Router} = require('express');

const {authController} = require('../controllers');
const {userMdwr, authMdwr} = require('../middlewares');

const authRouter = Router();

authRouter.post(
    '/login',
    userMdwr.getUserDinamicaly('body', 'email', 'email'),
    authController.login
);

authRouter.post(
    '/refresh',
    authMdwr.checkIsRefreshToken,
    authController.refresh,
);

module.exports = authRouter;