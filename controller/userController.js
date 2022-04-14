const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
// Handlers for Users
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  // SEND THE RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This response is yet not defined...'
  });
};
exports.createUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This response is yet not defined...'
  });
};
exports.updateUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This response is yet not defined...'
  });
};
exports.deleteUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This response is yet not defined...'
  });
};
