const express = require('express');
const tourController = require('../controller/tourController');
// => TOURS

const router = express.Router();
// Check ID Middleware
router.route('/tour-stats').get(tourController.getTourStats);
router
  .route('/top-5-cheaps')
  .get(tourController.alliasTopTours, tourController.getAllTours);
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
