const Tour = require('./../models/tourModel');

// ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  // Send the JSend for this request
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    requestTime: req.requestTime,
    // data: {
    //   tours: tours,
    // },
  });
};
exports.getTour = (req, res) => {
  // const id = req.params.id * 1;
  // // const tour = tours.find((el) => {
  //   return el.id == id;
  // });

  // Send the JSend for this request
  res.status(200).json({
    status: 'success',
    data: {
      // tour: tour,
    },
  });
};
exports.createTours = async (req, res) => {
  // const newTour = new Tour({});
  // newTour.save().then()
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.updateTours = (req, res) => {
  res.status(200).json({
    status: 'SUCCESS',
    data: {
      tour: '<Updated the info....>',
    },
  });
};
exports.deleteTours = (req, res) => {
  res.status(204).json({
    status: 'SUCCESS',
    data: null,
  });
};
