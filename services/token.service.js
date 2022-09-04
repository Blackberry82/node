const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {ApiError} = require('../errors');
const {statusCode, tokenTypeEnum} = require('../constants');
const {ACCESS_SECRET_WORD, REFRESH_SECRET_WORD} = require('../config/config');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (password, hashPassword) => {
        const isPasswordSame = await bcrypt.compare(password, hashPassword);

        if (!isPasswordSame) {
            throw new ApiError('Wrong email or password', statusCode.BAD_REQUEST);
        }
    },
    createAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, ACCESS_SECRET_WORD, {expiresIn: '40s'});
        const refresh_token = jwt.sign(payload, REFRESH_SECRET_WORD, {expiresIn: '30d'});

        return {
            access_token,
            refresh_token
        }
    },

    checkToken: (token, tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let word;

            if (tokenType === tokenTypeEnum.ACCESS) word = ACCESS_SECRET_WORD;
            if (tokenType === tokenTypeEnum.REFRESH) word = REFRESH_SECRET_WORD;

            return jwt.verify(token, word);

        } catch (e) {
            throw new ApiError('Token not valid', statusCode.AN_AUTHORIZED);
        }
    },
}