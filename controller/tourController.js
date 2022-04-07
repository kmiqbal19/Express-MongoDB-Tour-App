const fs = require('fs');
// GET TOURS OBJECT
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
// 2) ROUTE HANDLERS
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
  if (!tour) {
    return res.status(404).json({
      status: 'FAILED',
      message: 'INVALID_ID',
    });
  }

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
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'FAILED',
      message: 'INVALID_ID',
    });
  }
  res.status(200).json({
    status: 'SUCCESS',
    data: {
      tour: '<Updated the info....>',
    },
  });
};
exports.deleteTours = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'FAILED',
      message: 'INVALID_ID',
    });
  }
  res.status(204).json({
    status: 'SUCCESS',
    data: null,
  });
};
