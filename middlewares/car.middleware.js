const statusCode = require('../constants/statusCode');
const ApiError = require('../errors/ApiError');
const {carService} = require('../services');

module.exports = {
  isCarPresent: async (req, res, next) => {
    try {
      const {carId} = req.params;
      const car = await carService.getOneById(carId);

      if (!car) {
        return next(new ApiError('Car not exist', statusCode.NOT_FOUND));
      }
      req.car = car;
      next();
    } catch (e) {

    }
  }
};
