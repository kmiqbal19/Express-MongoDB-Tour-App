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
    useFindAndModify: false
  })
  .then(con => {
    console.log(con.connections);
    console.log('You have successfully logged in to MongoDB!');
  });
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, 'A tour name is required!']
  },
  price: {
    type: Number,
    require: [true, 'A price must be given!']
  },
  rating: {
    type: Number,
    default: 4.5
  }
});
const Tour = mongoose.model('Tour', tourSchema);
const app = require('./app');
// START SERVER
const port = process.env.PORT || 3000;
app.listen(port, '127.0.0.1', () => {
  console.log(`App is running on port ${port}...`);
});
