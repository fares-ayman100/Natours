const Tour = require('../Models/toursModel');
const catchAsync = require('../utils/catchAsync');
const getOverView = catchAsync(async (req, res) => {
  // 1) Get The Tours Data from collection
  const tours = await Tour.find();
  // 2) Build The Templete
  // 3) Render The Templet with Data

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

const getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Fores Hiker Tour',
  });
};

module.exports = {
  getOverView,
  getTour,
};
