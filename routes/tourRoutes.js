const express = require('express');
const tourController = require('../controller/tourController');
const authController = require('../controller/authController');
const reviewRouter = require('../routes/reviewRoutes');
// => TOURS
const router = express.Router();
// NESTED ROUTES
// POST | GET /tour/2343dflkfj34/reviews

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictedTo('user'),
//     reviewController.createReview
//   );
router.use('/:tourId/reviews', reviewRouter);

// TOUR STATS
router.route('/tour-stats').get(tourController.getTourStats);
// MONTHLY PLANS
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictedTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );
// TOP 5 CHEAPS
router
  .route('/top-5-cheaps')
  .get(tourController.alliasTopTours, tourController.getAllTours);
// TOUR WITH GEO RADIUS
// tours-within?distance=400&center=-40,50.23&unit=mi

// tours-within/400/center/-40,50.23/mi

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);
// GET ALL TOURS AND CREATE TOURS
router
  .route('/')
  .get(tourController.getAllTours)
  .post(
    authController.protect,
    authController.restrictedTo('admin', 'lead-guide'),
    tourController.createTours
  );
// GET TOURS WITH DIFFERENT QUERY AND WITH ID
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(
    authController.protect,
    authController.restrictedTo('admin', 'lead-guide'),
    tourController.updateTours
  )
  .delete(
    authController.protect,
    authController.restrictedTo('admin', 'lead-guide'),
    tourController.deleteTours
  );

module.exports = router;
