const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({});

const Film = mongoose.model('Film', schema);
module.exports = Film;