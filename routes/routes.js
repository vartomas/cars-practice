const router = require('express').Router()
const carController = require('../cars/carController')

router.get('/cars', carController.getAllCars)
router.post('/cars', carController.createCar)
router.get('/cars/:id', carController.getCar)
router.delete('/cars/:id', carController.deleteCar)
router.patch('/cars/:id', carController.updateCar)
router.post('/cars/filter', carController.filterCars)

module.exports = router