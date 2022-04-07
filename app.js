const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// 1) MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from the middleware...😁');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//   // GET
// app.get('/api/v1/tours', getAllTours);
// // GET with different URLs
// app.get('/api/v1/tours/:id', getTour);
// // POST
// app.post('/api/v1/tours', createTours );
// // PATCH (Update Data)
// app.patch('/api/v1/tours/:id', updateTours );
// // DELETE
// app.delete('/api/v1/tours/:id', deleteTours);

module.exports = app;
