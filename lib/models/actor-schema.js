const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({});

const Actor = mongoose.model('Actor', schema);
module.exports = Actor;