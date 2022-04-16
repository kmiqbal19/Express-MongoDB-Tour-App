const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
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
  role: {
    type: String,
    enum: ['user', 'admin', 'guide', 'lead-guide'],
    default: 'user'
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on create and save method of User model!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password are not equal.'
    }
  },
  passwordChangedAt: Date
});
// Middleware prehook
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost parameter of 12
  this.password = await bcryptjs.hash(this.password, 12);
  // Delete the password confirm field
  this.passwordConfirm = undefined;
  next();
});
// Schema instance method defining to check password
userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimeStamp, JWTTimestamp, '🥱🥱🥱');
    return JWTTimestamp < changedTimeStamp; //100 < 200
  }
  // False means NOT changed
  return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
