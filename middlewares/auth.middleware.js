const {statusCode, constant, tokenTypeEnum} = require('../constants');
const ApiError = require('../errors/ApiError');
const {authService, tokenService} = require("../services");

module.exports = {
    checkIsAccessToken: async (req, res, next) => {
        try {
         const access_token = req.get(constant.AUTHORIZATION);

         if (!access_token) {
             return next(new ApiError('No token', statusCode.AN_AUTHORIZED));
         }
         tokenService.checkToken(access_token);

            const tokenInfo = await authService.getOneWithUser({access_token});

         if (!tokenInfo) {
             return next(new ApiError('Not valid token', statusCode.AN_AUTHORIZED));
         }
            next();
        }catch (e){
            next(e);
        }
    },

    checkIsRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(constant.AUTHORIZATION);

            if (!refresh_token) {
                return next(new ApiError('No token', statusCode.AN_AUTHORIZED));
            }
            tokenService.checkToken(refresh_token, tokenTypeEnum.REFRESH);

            const tokenInfo = await authService.getOneByParams({refresh_token});

            if (!tokenInfo) {
                return next(new ApiError('Not valid token', statusCode.AN_AUTHORIZED));
            }
            req.tokenInfo = tokenInfo;
            next();
        }catch (e){
            next(e);
        }
    },

};