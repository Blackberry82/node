const fileService = require("../services/file.service");

module.exports = {
    getAllUsers: async (req, res) => {
        const usersFromService = await fileService.getUsers();
        res.json(usersFromService);
    },

    createUser: async (req, res) => {
        const user = await fileService.insertUser(req.body);
        res.status(201).json(user);
    },

    getUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('Wrong user');
            return;
        };

        const user = await fileService.getOneUser(+userId);

        if (!user) {
            res.status(404).json('User not found');
            return;
        }
        res.json(user)
    },

    updateUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('Wrong user Id');
            return;
        }

            const user = await fileService.updateUser(+userId, req.body);
            if (!user) {
                res.status(404).json('User not found');
                return;
            }
            res.status(201).json(user);

    },

    deleteUserById: async (req, res) => {
        const {userId} = req.params;

        if (Number.isNaN(+userId) || +userId < 0) {
            res.status(400).json('Wrong user Id');
            return;
        }

            const user = await fileService.deleteOneUser(+userId);
            if (!user) {
                res.status(404).json('User not found');
                return;
            }
            res.sendStatus(204);
        }
}