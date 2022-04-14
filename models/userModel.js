const mongoose = require('mongoose');
const validator = require('validator');
// name, photo , password, confirm password ,email
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name should be given']
  },
  email: {
    type: String,
    required: [true, 'Email must be provided'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password']
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
