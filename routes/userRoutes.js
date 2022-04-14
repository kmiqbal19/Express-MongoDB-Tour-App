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
// => SIGNUP
router.post('/signup', authController.signup);

module.exports = router;
