const {Router} = require('express');

const {carController} = require('../controllers');
const {commonMdwr, carMdwr, userMdwr, authMdwr} = require('../middlewares');
const {authService} = require("../services");

const carRouter = Router();

carRouter.post(
    '/',
    commonMdwr.checkIsIdValid('userId', 'query'),
    carMdwr.controlCarBodyIsValid,
    authMdwr.checkIsAccessToken,
    userMdwr.isUserPresent('query'),
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