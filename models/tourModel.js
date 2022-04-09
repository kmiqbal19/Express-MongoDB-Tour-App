const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour name is required!'],
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'A price must be given!'],
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have duration!'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have maximum group size!'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have difficulty level!'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary!'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a image cover!'],
  },
  images: [String], // Array of Strings
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date], // Array of Dates
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
