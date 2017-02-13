const assert = require('chai').assert;
const Film = require('../../lib/models/film-schema');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

describe.only('actor model', () => {
    it('example data with all fields', () => {
        return new Film({ name: 'Riddick', studio: 'Universal', released: '2013-09-04', actor: ['Vin Diesel'] })
            .validate()
            .then(film => console.log('actor: ', film))
            .catch(err => { throw err; });
    });
});