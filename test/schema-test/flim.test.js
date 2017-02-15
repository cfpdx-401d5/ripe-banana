const assert = require('chai').assert;
const Film = require('../../lib/models/film-schema');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

describe('actor model', () => {

    const studioOne = {
        name: 'Universal',
        address: {
            city: 'Los Angeles',
            state: 'CA',
            country: 'USA'
        },
        _id: 'BRT123'
    };

    it('validation fails with no title', () => {
        return new Film({ studio: studioOne._id, released: '1967-07-18T00:00:00.000Z' })
            .validate()
            .then(
                () => { throw new Error('validation should not pass'); },
                err => assert.isNotNull(err)
            );
    });

    it('validation fails with no release date', () => {
        return new Film({ name: 'Terminator', studio: studioOne._id })
            .validate()
            .then(
                () => { throw new Error('You need a release date for this record.'); },
                err => assert.isNotNull(err)
            );
    });

    it('validation fails with no studio', () => {
        return new Film({ name: 'Terminator', released: '1967-07-18T00:00:00.000Z' })
            .validate()
            .then(
                () => { throw new Error('You need a release date for this record.'); },
                err => assert.isNotNull(err)
            );
    });
});