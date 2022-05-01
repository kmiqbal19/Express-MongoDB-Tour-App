const express = require('express');

const authController = require('../controller/authController');
const userController = require('../controller/userController');

const router = express.Router();
// => SIGNUP
router.post('/signup', authController.signup);
// => LOGIN
router.route('/login').post(authController.login);
// => LOGOUT
router.route('/logout').get(authController.logout);
// => FORGOT PASSWORD
router.post('/forgotPassword', authController.forgotPassword);
// => RESET PASSWORD
router.patch('/resetPassword/:token', authController.resetPassword);
// => MIDDLEWARE FOR EXPRESS ROUTER (Middleware works in sequence) Protect all routes after this middleware
router.use(authController.protect);
// => UPDATE PASSWORD FOR CURRENT USER
router.patch(
  '/updateMyPassword',

  authController.updatePassword
);

// => UPDATE CURRENT USER DATA
router.patch('/updateMe', userController.updateMe);
// => DELETE USER
router.delete('/deleteMe', userController.deleteMe);
// => GET CURRENT USER
router.get(
  '/me',

  userController.getMe,
  userController.getUser
);
// Protect below routes by using only by admin
router.use(authController.restrictedTo('admin'));
// => USERS
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUsers)
  .delete(userController.deleteUsers);

module.exports = router;
