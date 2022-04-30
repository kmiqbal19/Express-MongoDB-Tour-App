const express = require('express');
const viewsController = require('../controller/viewsController');
const authController = require('../controller/authController');

const router = express.Router();

router.use(authController.isLoggedIn);
// BASE ROUTES

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);
router.route('/login').get(viewsController.getLoginForm);
module.exports = router;
