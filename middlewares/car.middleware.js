const statusCode = require('../constants/statusCode');
const ApiError = require('../errors/ApiError');
const {carService} = require("../services");

module.exports = {
    controlCarBodyIsValid: async (req, res, next) => {
        try {
            const {age, name} = req.body;

            // if (Number.isNaN(+age) || age <= 0) {
            //   return next(new ApiError('Wrong user age', statusCode.BAD_REQUEST));
            // }
            // if (name.length < 2) {
            //     return next(new ApiError('Wrong user name', statusCode.BAD_REQUEST));
            // }
            next();
        }catch (e){
            next(e);
        }
    },

    isCarPresent: async (req, res, next) => {
        try {
            const {carId} = req.params;
            const car = await carService.getOneById(carId);

            if (!car) {
                return next(new ApiError('Car not exist', statusCode.NOT_FOUND));
            }
            req.car = car;
            next();
        }catch (e){

        }
    }
};