const express = require('express');
const app = express();
app.get('/', (req, res) => {
  // res.status(200).send('Hello from the server side...');
  res
    .status(200)
    // .status(404)
    .json({ message: 'Hello from server side...', app: 'Natours' });
});
// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });
app.post('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'You can post to this endpoint...', app: 'Natours' });
});
const port = 3000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
