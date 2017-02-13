const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Actor = require('./actor-schema');
const Review = require('./review-schema');

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    studio: {
        type: Schema.Types.ObjectId,
        ref: 'Studio'
    },
    released: {
        type: Date,
        required: true
    },
    actors: [Actor.schema],
    reviews: [Review.schema]

});

const Film = mongoose.model('Film', schema);
module.exports = Film;