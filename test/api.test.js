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

    let actorTwo = {
        name: 'Vin Diesel',
        dob: '1969-04-25T00:00:00.000Z'
    };

    let actorThree = {
        name: 'Judy Dench',
        dob: '1925-11-04T00:00:00.000Z'
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

    let filmOne = {
        title: 'My Film',
        released: '2015-06-14T00:00:00.000Z',
        reviews: [{ rating: 3, review: 'It was the most boring movie.' }, { rating: 5, review: 'it was great!' }]
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
    });

    describe('API for films', () => {
        it('more test actors actor', () => {
            return saveResource(actorTwo, '/actors')
                .then(savedActor => {
                    assert.isOk(savedActor._id);
                    actorTwo._id = savedActor._id;
                    actorTwo.__v = 0;
                    assert.deepEqual(savedActor, actorTwo);
                });
        });

        it('and more', () => {
            return saveResource(actorThree, '/actors')
                .then(savedActor => {
                    assert.isOk(savedActor._id);
                    actorThree._id = savedActor._id;
                    actorThree.__v = 0;
                    assert.deepEqual(savedActor, actorThree);
                });
        });

        it('get films', () => {
            return request.get('/films')
                .then(req => req.body)
                .then(res => {
                    assert.deepEqual(res, []);
                });
        });

        it('post films', () => {
            filmOne.studio = studioOne._id;
            filmOne.actors = [actorOne._id, actorThree._id, actorTwo._id];

            return saveResource(filmOne, '/films')
                .then(savedFilm => {
                    assert.isOk(savedFilm._id);
                    filmOne._id = savedFilm._id;
                    filmOne.__v = 0;
                    assert.equal(savedFilm.studio, filmOne.studio);
                    assert.deepEqual(savedFilm.actors, filmOne.actors);
                });
        });

        it('get film by id', () => {
            return request.get(`/films/${filmOne._id}`)
                .then(res => {
                    assert.equal(res.body[0].studio, filmOne.studio);
                    assert.deepEqual(res.body[0].actors, filmOne.actors);
                });
        });
    });

});