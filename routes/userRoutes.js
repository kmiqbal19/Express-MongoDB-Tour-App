const express = require('express');

const authController = require('../controller/authController');
const {
  getAllUsers,
  createUsers,
  getUser,
  updateUsers,
  deleteUsers
} = require('../controller/userController');

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
// => USERS
router
  .route('/')
  .get(getAllUsers)
  .post(createUsers);
router
  .route('/:id')
  .get(getUser)
  .patch(updateUsers)
  .delete(deleteUsers);

module.exports = router;
