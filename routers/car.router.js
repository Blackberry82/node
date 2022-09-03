const {Router} = require('express');

const {carController} = require('../controllers');
const {commonMdwr, carMdwr, userMdwr} = require('../middlewares');

const carRouter = Router();

carRouter.post(
    '/',
    commonMdwr.checkIsIdValid('userId', 'query'),
    carMdwr.controlCarBodyIsValid,
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
    carMdwr.isCarPresent,
    carController.updateCarById
);

carRouter.delete(
    '/:carId',
    commonMdwr.checkIsIdValid('carId'),
    carMdwr.isCarPresent,
    carController.deleteCarById
);

module.exports = carRouter;