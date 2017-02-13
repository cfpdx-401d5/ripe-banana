const assert = require('chai').assert;
const Film = require('../../lib/models/film-schema');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

describe.only('actor model', () => {
    it('validation fails with no title', () => {
        return new Film({ dob: '1967-07-18' })
            .validate()
            .then(
                () => { throw new Error('You need a name for this record.'); },
                err => assert.isNotNull(err)
            );
    });
});