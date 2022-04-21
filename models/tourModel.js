const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');
// const validator = require('validator');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour name is required!'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A tour name must have less or equal than 40 characters.'
      ],
      minlength: [
        10,
        'A tour name must have greater or equal than 10 characters.'
      ]
      // Using external library for the validators
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
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
      required: [true, 'A tour must have difficulty level!'],
      enum: {
        values: ['easy', 'difficult', 'medium'],
        message: 'Difficulty must be either: easy, difficult, medium'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Ratings must be atleast 1'],
      max: [5, 'Ratings cannot be more than 5']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function(value) {
          // Here 'this' only refers to current documnt on NEW document creation
          return value < this.price;
        },
        message: 'Discount price {VALUE} should be less than regular price!'
      }
    },
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
    startDates: [Date], // Array of Dates
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          dafault: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],

    guides: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
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
// For Embedding Data
// tourSchema.pre('save', async function(next) {
//   const guidePromises = this.guides.map(async id => await User.findById(id));
//   this.guides = await Promise.all(guidePromises);
//   next();
// });

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
tourSchema.pre(/^find/, function(next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});
tourSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });
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
  // console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
