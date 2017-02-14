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
        dob: '1975-01-05T00:00:00.000Z'
    };

    let actorTwo = {
        name: 'Lupita Nyong\'o',
        dob: '1983-03-01T00:00:00.000Z'
    };

    let actorThree = {
        name: 'Meryl Streep',
        dob: '1949-06-22T00:00:00.000Z'
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
                    assert.isOk(savedActor._id);
                    actorOne._id = savedActor._id;
                    actorOne.__v = 0;
                    assert.deepEqual(savedActor, actorOne);
                });
        });

        it('GET actor by id', () => {
            return request.get(`/actors/${actorOne._id}`)
                .then(res => {
                    assert.deepEqual(res.body, actorOne);
                });
        });

        it('GET all actors', () => {
            return Promise.all([
                saveResource(actorTwo, '/actors'),
                saveResource(actorThree, '/actors')
            ])
            .then(savedActors => {
                actorTwo = savedActors[0];
                actorThree = savedActors[1]
            })
            .then(() => request.get('/actors'))
            .then(res => {
                const actors = res.body;
                assert.deepEqual(actors, [actorOne, actorTwo, actorThree]);
            });
        });
    });

    describe('studios API TEST', () => {

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
                    assert.isOk(savedStudio._id);
                    studioOne._id = savedStudio._id;
                    studioOne.__v = 0;
                    assert.deepEqual(savedStudio, studioOne);
                });
        });

        it('GET studio by id', () => {
            return request.get(`/studios/${studioOne._id}`)
                .then(res => {
                    assert.deepEqual(res.body, studioOne);
                });
        });

        it('GET all studios', () => {
            return Promise.all([
                saveResource(studioTwo, '/studios'),
                saveResource(studioThree, '/studios')
            ])
            .then(savedStudios => {
                studioTwo = savedStudios[0],
                studioThree = savedStudios[1]
            })
            .then(() => request.get('/studios'))
            .then(res => {
                const studios = res.body;
                assert.deepEqual(studios, [studioOne, studioTwo, studioThree]);
            });
        });

    // describe('API for films', () => {
    //     it('get films', () => {

    //     });

    //     it('post films', () => {

    //     });
    // });

    });
});