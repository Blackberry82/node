const {Router} = require('express');

const userController = require('../controllers/user.controller');
const userMiddleware = require('../middlewares/user.middleware');

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMiddleware.controlUserValue, userController.createUser);

userRouter.get('/:userId', userController.getUserById);
userRouter.put('/:userId', userController.updateUserById);
userRouter.delete('/:userId', userController.deleteUserById);

module.exports = userRouter;