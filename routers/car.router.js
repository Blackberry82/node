const {Router} = require('express');

const {carController} = require('../controllers');
const {commonMdwr, carMdwr, authMdwr} = require('../middlewares');
const {newCarValidator, updateCarValidator} = require('../validator/car.validators');

const carRouter = Router();

carRouter.post(
  '/',
  commonMdwr.checkIsBodyValid(newCarValidator),
  authMdwr.checkIsAccessToken,
  carController.createCar
);

carRouter.get(
  '/:carId',
  commonMdwr.checkIsIdValid('carId'),
  carMdwr.isCarPresent,
  carController.getCarById
);

carRouter.put(
  '/:carId',
  commonMdwr.checkIsIdValid('carId'),
  commonMdwr.checkIsBodyValid(updateCarValidator),
  authMdwr.checkIsAccessToken,
  carMdwr.isCarPresent,
  carController.updateCarById
);

carRouter.delete(
  '/:carId',
  commonMdwr.checkIsIdValid('carId'),
  authMdwr.checkIsAccessToken,
  carMdwr.isCarPresent,
  carController.deleteCarById
);

module.exports = carRouter;
