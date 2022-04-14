const express = require('express');

const app = express();
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
// 1) MIDDLEWARES
// console.log(app.get('env'));
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// Error Handling for Invalid Url by using Middleware
app.all('*', (req, res, next) => {
  next(
    new AppError(`Couldn't find this ${req.originalUrl} in this server!`, 404)
  );
});
app.use(globalErrorHandler);
module.exports = app;
