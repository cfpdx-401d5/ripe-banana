const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({});

const Studio = mongoose.model('Studio', schema);
module.exports = Studio;