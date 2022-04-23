// Configure the PROCESS ENV Variables
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! 💥 Shutting down....');

  process.exit(1);
});

dotenv.config({ path: './config.env' });
// console.log(process.env);
// MONGOOSE for connecting DB
const mongoose = require('mongoose');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    autoIndex: true
  })
  // eslint-disable-next-line no-unused-vars
  .then(con => {
    // console.log(con.connections);
    console.log('You have successfully logged in to MongoDB!');
  });
// .catch(err => console.log(err));
const app = require('./app');
// START SERVER
const port = process.env.PORT || 3000;
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
// Safety Net
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled rejection! Shutting down....');
  server.close(() => {
    process.exit(1);
  });
});
