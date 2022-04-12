const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour name is required!'],
      unique: true,
      trim: true
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'A price must be given!']
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have duration!']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have maximum group size!']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have difficulty level!']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary!']
    },
    description: {
      type: String,
      trim: true
    },
    secretTour: {
      type: Boolean,
      default: false
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a image cover!']
    },
    images: [String], // Array of Strings
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date] // Array of Dates
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});
// DOCUMENT MIDDLEWARES: runs before .save() and .create() -- This are Mongoose Hooks
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
// tourSchema.pre('save', function(next) {
//   console.log('Will save the document...');
//   next();
// });
// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
tourSchema.post('find', function(doc, next) {
  // console.log(doc);
  // console.log(`Query finished in ${Date.now() - this.start} milliseconds!`);
  next();
});
// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
