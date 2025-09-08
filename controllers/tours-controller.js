const express = require('express');
const fs = require('fs');
const app = express();
const httpStatus = require('../utils/http-status');
const toursOBJ = JSON.parse(
  fs.readFileSync('./dev-data/data/tours-simple.json')
);
const checkID = (req, res, next, val) => {
  if (val > toursOBJ.length - 1) {
    return res.status(404).json({
      status: httpStatus.FAILD,
      message: 'Invalid ID',
    });
  }
  next();
};
const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .json({ status: httpStatus.ERROR, message: 'Missing Name Or Duration' });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: httpStatus.SUCCESS,
    results: toursOBJ.length,
    tours: toursOBJ,
  });
};
const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = toursOBJ.find((el) => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: httpStatus.FAILD,
      message: 'Invalid ID',
    });
  }
  res.status(200).json({ status: httpStatus.SUCCESS, tour });
};
const addTour = (req, res) => {
  const newID = toursOBJ[toursOBJ.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  toursOBJ.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursOBJ),
    (err) => {
      res.status(201).json({
        status: httpStatus.SUCCESS,
        tour: newTour,
      });
    }
  );
};
const updateTour = (req, res) => {
  res.status(200).json({
    status: httpStatus.SUCCESS,
    tour: '<Updated Tour>',
  });
};
const deleteTour = (req, res) => {
  res.status(200).json({
    status: httpStatus.SUCCESS,
    tour: null,
  });
};
module.exports = {
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  addTour,
  checkID,
  checkBody,
};
