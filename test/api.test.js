const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../lib/app');

chai.use(chaiHttp);
const request = chai.request(app);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripeBananas-test';
require('../lib/mongo-connection');

describe('actors API TEST', () => {

    before(() => mongoose.connection.dropDatabase());

    it('GET returns empty array of actors', () => {
        return request.get('/actors')
            .then(req => req.body)
            .then(res => {
                assert.deepEqual(res, []);
            })
    });

    // it('POST all actors', () => {
       
    // });

    // it('GET one actor by id', () => {
       
    // });

});

