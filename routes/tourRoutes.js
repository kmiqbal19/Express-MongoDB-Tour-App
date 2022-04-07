const express = require('express');
const tourController = require('../controller/tourController');
// => TOURS
const tourRouter = express.Router();
tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTours);

tourRouter
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTours)
  .delete(tourController.deleteTours);

module.exports = tourRouter;
