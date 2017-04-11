const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review-schema');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    studio: {
        type: Schema.Types.ObjectId,
        ref: 'Studio',
        required: true
    },
    released: {
        type: Date,
        required: true
    },
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
    reviews: [Review.schema]
});

const Film = mongoose.model('Film', schema);
module.exports = Film;