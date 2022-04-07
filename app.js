const express = require('express');
const fs = require('fs');
const app = express();
// Middleware
app.use(express.json());
// GET
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
app.get('/api/v1/tours', (req, res) => {
  // Send the JSend for this request
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});
// POST
app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.send('DONE!!');
});
// Listen to Server
const port = 3000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
