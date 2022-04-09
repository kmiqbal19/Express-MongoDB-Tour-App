const fs = require('fs');
// GET TOURS OBJECT
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
// Param Middleware Handler
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'FAILED',
      message: 'INVALID_ID',
    });
  }
  next();
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'No Name or Price is found!',
    });
  }
  next();
};
// ROUTE HANDLERS
exports.getAllTours = (req, res) => {
  // Send the JSend for this request
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestTime: req.requestTime,
    data: {
      tours: tours,
    },
  });
};
exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => {
    return el.id == id;
  });

  // Send the JSend for this request
  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};
exports.createTours = (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: tours,
        },
      });
    }
  );
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
