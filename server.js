// Configure the PROCESS ENV Variables
const dotenv = require('dotenv');
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
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('You have successfully logged in to MongoDB!');
  });

const app = require('./app');
// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
