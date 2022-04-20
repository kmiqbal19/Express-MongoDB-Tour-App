// Configure the PROCESS ENV Variables
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config({ path: '../../config.env' });
// console.log(process.env.DATABASE);
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(con => {
    console.log('You have successfully logged in to MongoDB!');
  });
// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
// IMPORT DATA IN DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data has imported successfully....');
  } catch (err) {
    console.log(err);
  }
};
// DELETE DATA IN DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data has been deleted successfully....');
  } catch (err) {
    console.log(err);
  }
};
console.log(process.argv);
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
