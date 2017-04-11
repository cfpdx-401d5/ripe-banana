const express = require('express');
const app = express();

const ripeBananasActor = require('./routes/actor-routes');
const ripeBananasFilm = require('./routes/film-routes');
const ripeBananasStudio = require('./routes/studio-routes');

const morgan = require('morgan');
app.use(morgan('dev'));

const path = require('path');
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.use('/actors', ripeBananasActor);
app.use('/films', ripeBananasFilm);
app.use('/studios', ripeBananasStudio);


module.exports = app;