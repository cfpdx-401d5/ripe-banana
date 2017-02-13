const express = require('express');
const Router = express.Router;
const reviewRouter = Router();
const Review = require('../models/review-schema');

module.exports = reviewRouter;