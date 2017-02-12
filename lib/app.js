const express = require('express');
const app = express();
const ripeBananas = require('./routes'); //not sure if this can be done, or if each fille needs to be called
const morgan = require('morgan');
app.use(morgan('dev'));

const path = require('path');
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

//not sure if this is correct of if each file needs to be called
app.use('/ripeBananas', ripeBananas);

module.exports = app;