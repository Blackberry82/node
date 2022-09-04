const statusCode = require('../constants/statusCode');
const ApiError = require('../errors/ApiError');
const {userService} = require("../services");
const User = require('../dataBase/User');

module.exports = {
    controlUserBodyIsValid: async (req, res, next) => {
        try {
            const {age, name} = req.body;

            if (Number.isNaN(+age) || age <= 0) {
              return next(new ApiError('Wrong user age', statusCode.BAD_REQUEST));
            }
            if (name.length < 2) {
                return next(new ApiError('Wrong user name', statusCode.BAD_REQUEST));
            }
            next();
        }catch (e){
            next(e);
        }
    },

    checkIsUserEmailUniq: async (req, res, next) => {
        try {
            const {email} = req.body;
            const {userId} = req.params;

            const userByEmail = await userService.getOneByParams({email});

            if (userByEmail && userByEmail._id.toString() !== userId) {
                return next(new ApiError('Email already exist',statusCode.CONFLICT));
            }
            next();
        }catch (e){

        }
    },

    isUserPresent: (from = 'params') => async (req, res, next) => {
        try {
            const {userId} = req[from];
            const user = await userService.getOneById(userId);

            if (!user) {
                return next(new ApiError('User not exist', statusCode.NOT_FOUND));
            }
            req.user = user;
            next();
        }catch (e){

        }
    },

    getUserDinamicaly: (from = 'body', filedName = 'userId', dbField = filedName) => {
        return async function (req, res, next) {
            try {
                const filedToSearch = req[from][filedName];
                const user = await User.findOne({[dbField]: filedToSearch});

                if (!user) {
                    return next(new ApiError('User not exist', statusCode.NOT_FOUND));
                }
                req.user = user;
                next();
            } catch (e) {

            }
        }
    }



};