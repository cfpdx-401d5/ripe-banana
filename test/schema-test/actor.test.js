const assert = require('chai').assert;
const Actor = require('../../lib/models/actor-schema');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

describe.only('actor model', () => {
    it('validation fails with no name', () => {
        return new Actor({ dob: '1967-07-18' })
            .validate()
            .then(
                () => { throw new Error('You need a name for this record.'); },
                err => assert.isNotNull(err)
            );
    });

    it('validation fails with no dob', () => {
        return new Actor({ name: 'Vin Diesel' })
            .validate()
            .then(
                () => { throw new Error('You need a dob for this record.'); },
                err => assert.isNotNull(err)
            );
    });
});