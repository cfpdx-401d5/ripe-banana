const assert = require('chai').assert;
const Review = require('../../lib/models/review-schema');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

describe('review model', () => {
    it('rating validation returns error for numbers outside of 1-5', () => {
        return new Review({ rating: 7, review: 'This is a test review.' })
            .validate()
            .then(
                () => { throw new Error(); },
                err => assert.isNotNull(err));
    });
});