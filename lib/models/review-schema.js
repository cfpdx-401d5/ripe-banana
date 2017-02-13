const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    rating: {
        type: Number,
        validate: {
            validator(value) {
                return value >= 0 && value <= 5;
            },
            message: 'Please use a rating 1-5.'
        }
    },
    review: {
        type: String,
        maxlength: 140
    }
});

const Review = mongoose.model('Review', schema);
module.exports = Review;