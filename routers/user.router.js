const {Router} = require('express');

const userController = require('../controllers/user.controller');
const {commonMdwr, userMdwr} = require('../middlewares');

const userRouter = Router();

userRouter.get(
    '/',
    userController.getAllUsers
);

userRouter.post(
    '/',
    userMdwr.controlUserBodyIsValid,
    userMdwr.checkIsUserEmailUniq,
    userController.createUser
);

userRouter.get(
    '/:userId',
    commonMdwr.checkIsIdValid('userId'),
    userMdwr.isUserPresent(),
    userController.getUserById
);

userRouter.put(
    '/:userId',
    commonMdwr.checkIsIdValid('userId'),
    userMdwr.isUserPresent(),
    userMdwr.checkIsUserEmailUniq,
    userController.updateUserById
);

userRouter.delete(
    '/:userId',
    commonMdwr.checkIsIdValid('userId'),
    userMdwr.isUserPresent(),
    userController.deleteUserById
);

module.exports = userRouter;