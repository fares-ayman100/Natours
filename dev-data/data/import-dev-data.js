const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../Models/toursModel');
const User = require('../../Models/usersModel');
const Review = require('../../Models/reviewsModel');
require('dotenv').config();

const DB = process.env.DATABASE;
mongoose.connect(DB).then(() => {
  //console.log('Connection Successful');
});
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8'),
);
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'),
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'),
);
const importTours = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await Tour.create(tours);
    await Review.create(reviews);
    //console.log('Loadid Data Successfuly');
  } catch (err) {
    //console.log(err);
  }
  process.exit();
};
const deleteTours = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    //console.log('Delete Data Successfuly');
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
//console.log(process.argv);
