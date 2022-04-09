const express = require('express');
const {
  getAllUsers,
  createUsers,
  getUser,
  updateUsers,
  deleteUsers,
} = require('../controller/userController');
// => USERS
const router = express.Router();
router.route('/').get(getAllUsers).post(createUsers);
router.route('/:id').get(getUser).patch(updateUsers).delete(deleteUsers);

module.exports = router;
