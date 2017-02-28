const assert = require('chai').assert;
const Studio = require('../../lib/models/studio-schema');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

describe('studio model', () => {
    it('validation error if studio has no name', () => {
        return new Studio({ address: { city: 'Lisbon', state: 'TN', country: 'USA' } })
            .validate()
            .then(
                () => { throw new Error(); },
                err => assert.isNotNull(err));
    });
});