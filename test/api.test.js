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

    let filmTwo = {
        title: 'Your Film',
        released: '2012-02-28T00:00:00.000Z',
        reviews: [{ rating: 4, review: 'Best film I have seen this year!' }, { rating: 3, review: 'I hope the squel is better.' }]
    };

    let filmThree = {
        title: 'Their Film',
        released: '2008-10-15T00:00:00.000Z',
        reviews: [{ rating: 2, review: 'This stinks!' }, { rating: 1, review: 'I could have done better.' }]
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
            return Promise
                .all([saveResource(actorTwo, '/actors'), saveResource(actorThree, '/actors')])
                .then(savedActors => {
                    actorTwo = savedActors[0];
                    actorThree = savedActors[1];
                })
                .then(() => request.get('/actors'))
                .then(res => {
                    const actors = res.body;
                    assert.deepEqual(actors, [actorOne, actorTwo, actorThree]);
                });
        });

        it('updates saved actor with PUT', () => {
            actorOne.name = 'Brad Cooper';
            return request.put(`/actors/${actorOne._id}`)
                .send(actorOne)
                .then(res => {
                    assert.deepEqual(res.body, actorOne);
                    return request.get(`/actors/${actorOne._id}`);
                })
                .then(res => {
                    assert.deepEqual(res.body.name, actorOne.name);
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
            return Promise
                .all([saveResource(studioTwo, '/studios'), saveResource(studioThree, '/studios')])
                .then(savedStudios => {
                    studioTwo = savedStudios[0],
                        studioThree = savedStudios[1];
                })
                .then(() => request.get('/studios'))
                .then(res => {
                    const studios = res.body;
                    assert.deepEqual(studios, [studioOne, studioTwo, studioThree]);
                });
        });

    });

    describe('API for films', () => {

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
                    assert.equal(res.body[0].studio._id, filmOne.studio);
                    assert.deepEqual(res.body[0].actors, filmOne.actors);
                });
        });

        it('GET all studios', () => {
            filmTwo.studio = studioTwo._id;
            filmTwo.actors = [actorOne._id, actorThree._id, actorTwo._id];
            filmThree.studio = studioThree._id;
            filmThree.actors = [actorOne._id, actorThree._id, actorTwo._id];

            return Promise
                .all([saveResource(filmTwo, '/films'), saveResource(filmThree, '/films')])
                .then(savedFilms => {
                    filmTwo = savedFilms[0],
                        filmThree = savedFilms[1];
                })
                .then(() => request.get('/films'))
                .then(res => {
                    assert.equal(res.body[0].studio, filmOne.studio);
                    assert.deepEqual(res.body[1].actors, filmTwo.actors);
                });
        });

        it('update a film - add a review', () => {
            const newReview = { rating: 2, review: 'I have seen better' };

            return request.post(`/films/${filmTwo._id}/reviews`)
                .send(JSON.stringify(newReview))
                .then(res => {
                    assert.equal(res.body.reviews[2].rating, newReview.rating);
                });
        });

        it('update a film - update a release date', () => {
            filmTwo.released = '2012-02-26T00:00:00.000Z';

            return request.put(`/films/${filmTwo._id}`)
                .send(filmTwo)
                .then(res => {
                    assert.equal(res.body.released, filmTwo.released);
                    return request.get(`/films/${filmTwo._id}`);
                });
        });

        it('update a flim - add an actor to an existing film', () => {});

        it('DELETE a film by id', () => {
            return request.del(`/films/${filmThree._id}`)
                .then(res => {
                    assert.isTrue(res.body.deleted);
                });
        });

    });

    describe('tests delete', () => {
        let actorFour = {
            name: 'Meryl Streep',
            dob: '1949-06-22T00:00:00.000Z'
        };

        it('deletes saved actor not in Film', () => {

            return saveResource(actorFour, '/actors')
                .then(savedActor => {
                    actorFour = savedActor;
                })
                .then(() => {
                    return request.del(`/actors/${actorFour._id}`);
                })
                .then(res => {
                    assert.isTrue(res.body.deleted);
                });
        });

        it('tries to delete actor in Film', () => {
            return request.del(`/actors/${actorOne._id}`)
                .then(
                    () => { throw new Error('successful response not expected'); },
                    (res) => {
                        assert.equal(res.status, 400);
                        assert.equal(res.response.body.error, 'CANNOT REMOVE ACTOR IN FILM');
                    }

                );
            // OTHER OPTION FOR HANDLING ERROR
            // .catch((res) => {
            //         assert.equal(res.status, 400);
            //         assert.equal(res.response.body.error, `CANNOT REMOVE ACTOR IN FILM`);
            //     }
            // )
        });

        it('tries to delete actor with wrong id', () => {
            return request.del('/actors/58a36a64c9fd0e3630d3e3c1')
                .then(
                    () => { throw new Error('successful response not expected'); },
                    res => {
                        assert.equal(res.status, 404);
                        assert.equal(res.response.body.error, 'CANNOT FIND ID 58a36a64c9fd0e3630d3e3c1 TO REMOVE');
                    }
                );
        });
    });
});