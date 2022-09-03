const statusCode = require('../constants/statusCode');
const ApiError = require('../errors/ApiError');
const userService = require('../services/user.service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            res.json(users);
        }catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await userService.createUser(req.body);
            res.status(statusCode.CREATE).json(user);
        }catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user} = req;
            res.json(user);
        }catch (e){
            next(e);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            const user = await userService.updateUserById(userId, req.body);

            res.json(user);

        }catch (e){
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const {userId} = req.params;

            await userService.deleteUserById(userId);

            res.sendStatus(statusCode.N0_CONTENT);

        }catch (e){
            next(e);
        }
        }
}