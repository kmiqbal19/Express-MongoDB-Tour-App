const express = require('express');
const tourController = require('../controller/tourController');
const authController = require('../controller/authController');
// => TOURS

const router = express.Router();
// Check ID Middleware
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/top-5-cheaps')
  .get(tourController.alliasTopTours, tourController.getAllTours);
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTours);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTours)
  .delete(
    authController.protect,
    authController.restrictedTo('admin', 'lead-guide'),
    tourController.deleteTours
  );

module.exports = router;
