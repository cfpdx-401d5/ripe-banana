const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({});

const Review = mongoose.model('Review', schema);
module.exports = Review;