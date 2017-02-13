const express = require('express');
const Router = express.Router;
const filmRouter = Router();
const Film = require('../models/film-schema');

module.exports = filmRouter;