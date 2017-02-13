const assert = require('chai').assert;
const Actor = require('../lib/models/actor-schema');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

describe.only('actor model', () => {
    it('example data with all fields', () => {
        return new Actor({ name: 'Vin Diesel', dob: '1967-07-18' })
            .validate()
            .then(actor => console.log('actor: ', actor))
            .catch(err => { throw err; });
    });
});