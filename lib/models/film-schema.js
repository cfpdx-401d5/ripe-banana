const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    actors: [{ type: Schema.Types.ObjectId, ref: 'Actor' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

const Film = mongoose.model('Film', schema);
module.exports = Film;