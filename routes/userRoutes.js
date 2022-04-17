const express = require('express');

const authController = require('../controller/authController');
const userController = require('../controller/userController');

const router = express.Router();
// => SIGNUP
router.post('/signup', authController.signup);
// => LOGIN
router.post('/login', authController.login);
// => FORGOT PASSWORD
router.post('/forgotPassword', authController.forgotPassword);
// => RESET PASSWORD
router.patch('/resetPassword/:token', authController.resetPassword);
// => UPDATE PASSWORD FOR CURRENT USER
router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
// => UPDATE CURRENT USER DATA
router.patch('/updateMe', authController.protect, userController.updateMe);
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
