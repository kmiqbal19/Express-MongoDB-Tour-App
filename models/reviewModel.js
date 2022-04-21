const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      dafault: Date.now
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour.']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user.']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
// Query Middlewares for REVIEWS
reviewSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'tour',
    select: '-guides _id name'
  }).populate({
    path: 'user',
    select: '_id name'
  });
  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
