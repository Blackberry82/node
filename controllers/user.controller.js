const fileService = require("../services/file.service");
const statusCode = require('../constants/statusCode');

module.exports = {
    getAllUsers: async (req, res) => {
        const usersFromService = await fileService.getUsers();
        res.json(usersFromService);
    },

    createUser: async (req, res) => {
        const user = await fileService.insertUser(req.body);
        res.status(statusCode.CREATE).json(user);
    },

    getUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(statusCode.BAD_REQUEST).json('Wrong user');
            return;
        }

        const user = await fileService.getOneUser(+userId);

        if (!user) {
            res.status(statusCode.NO_FOUND).json('User not found');
            return;
        }
        res.json(user)
    },

    updateUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(statusCode.BAD_REQUEST).json('Wrong user Id');
            return;
        }

            const user = await fileService.updateUser(+userId, req.body);
            if (!user) {
                res.status(statusCode.NO_FOUND).json('User not found');
                return;
            }
            res.status(statusCode.CREATE).json(user);

    },

    deleteUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(statusCode.BAD_REQUEST).json('Wrong user Id');
            return;
        }

            const user = await fileService.deleteOneUser(+userId);
            if (!user) {
                res.status(statusCode.BAD_REQUEST).json('User not found');
                return;
            }
            res.sendStatus(statusCode.N0_CONTENT);
        }
}