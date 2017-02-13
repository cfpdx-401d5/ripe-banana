const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../lib/app');

chai.use(chaiHttp);
const request = chai.request(app);

process.env.MONGODB_URI = 'mongodb://localhost:27017/ripeBananas-test';
require('../lib/mongo-connection');

describe('test data for project', () => {
    before(() => mongoose.connection.dropDatabase());

    let actorOne = {
        name: 'Bradley Cooper',
        dob: '1976-12-03T00:00:00.000Z'
    };

    let studioOne = {
        name: 'MGM Studios',
        address: {
            city: 'Burbank',
            state: 'CA',
            country: 'USA'
        }
    };

    let studioTwo = {
        name: 'MGM Studios',
        address: {
            city: 'Burbank',
            state: 'CA',
            country: 'USA'
        }
    };

    let studioThree = {
        name: 'Texan Studios',
        address: {
            city: 'Austin',
            state: 'TX',
            country: 'USA'
        }
    };

    function saveResource(resource, route) {
        return request.post(route)
            .send(resource)
            .then(res => res.body);
    }

    describe('actors API TEST', () => {

        it('GET returns empty array of actors', () => {
            return request.get('/actors')
                .then(req => req.body)
                .then(res => {
                    assert.deepEqual(res, []);
                });
        });



        it('POST new actor', () => {
            return saveResource(actorOne, '/actors')
                .then(savedActor => {
                    assert.deepEqual(savedActor.name, actorOne.name);
                    assert.deepEqual(savedActor.dob, actorOne.dob);
                    assert.isOk(savedActor._id);
                    assert.equal(savedActor.__v, '0');
                });
        });

    });

    describe('studios API TEST', () => {

        //before(() => mongoose.connection.dropDatabase());

        it('GET returns empty array of studios', () => {
            return request.get('/studios')
                .then(req => req.body)
                .then(res => {
                    assert.deepEqual(res, []);
                });
        });



        it('POST new studio', () => {
            return saveResource(studioOne, '/studios')
                .then(savedStudio => {
                    assert.deepEqual(savedStudio.name, studioOne.name);
                    assert.isOk(savedStudio._id);
                    assert.deepEqual(savedStudio.address, studioOne.address);
                });
        });

        // it('GET studio by id', () => {
        //     return request.get(`/studios/${studioOne._id}`)
        //         .then(res => {
        //             assert.deepEqual(res._id, studioOne._id)
        //         })
        // })

    });

});