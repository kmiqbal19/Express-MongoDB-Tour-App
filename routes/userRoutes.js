const express = require('express');
const {
  getAllUsers,
  createUsers,
  getUser,
  updateUsers,
  deleteUsers,
} = require('../controller/userController');
// => USERS
const userRouter = express.Router();
userRouter.route('/').get(getAllUsers).post(createUsers);
userRouter.route('/:id').get(getUser).patch(updateUsers).delete(deleteUsers);

module.exports = userRouter;
