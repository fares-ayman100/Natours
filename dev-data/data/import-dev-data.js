const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../Models/toursModel');
require('dotenv').config();

const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  console.log('Connection Successful');
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'),
);
const importTours = async () => {
  try {
    await Tour.create(tours);
    console.log('Loadid Data Successfuly');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
const deleteTours = async () => {
  try {
    await Tour.deleteMany();
    console.log('Delete Data Successfuly');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] == '--import') {
  importTours();
} else if (process.argv[2] == '--delete') {
  deleteTours();
}
console.log(process.argv);
