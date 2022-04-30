const express = require('express');
const viewsController = require('../controller/viewsController');

const router = express.Router();

// BASE ROUTES

router.get('/', viewsController.getOverview);
router.get('/tour/:slug', viewsController.getTour);
router.route('/login').get(viewsController.getLoginForm);
module.exports = router;
