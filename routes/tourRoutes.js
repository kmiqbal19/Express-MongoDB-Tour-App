const express = require('express');
const tourController = require('../controller/tourController');
// => TOURS

const router = express.Router();
// Check ID Middleware
// router.param('id', tourController.checkID);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTours);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTours)
  .delete(tourController.deleteTours);

module.exports = router;
