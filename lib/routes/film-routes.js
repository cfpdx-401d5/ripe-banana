const express = require('express');
const Router = express.Router;
const filmRouter = Router();
const Film = require('../models/film-schema');
//const Review = require('../models/review-schema');
const helper = require('../helper-functions');

filmRouter
    .get('/', (req, res, next) => {
        const query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        Film.find(query)
            .then(films => res.send(films))
            .catch(next);
    })

.get('/:id', (req, res, next) => {
    const query = {};
    if (req.query.type) {
        query.type = req.query.type;
    }
    Film.find(query)
        .populate('studio', 'actors')
        .then(films => res.send(films))
        .catch(next);
})

.post('/', (req, res, next) => {
    helper.parseBody(req)
        .then(body => {
            return new Film(body).save();
        })
        .then(film => { res.send(film); })
        .catch(err => {
            console.log('error: ', err);
            next(err);
        });
})

// .post('/:id', (req, res, next) => {

//     helper.parseBody(req)
//         .then(review => {
//             console.log('review: ', review);
//             return new Review(review).save();
//         })
//         .then(data => {
//             return Film.findById(req.params.id)
//                 .then(film => {
//                     film.reviews.push(data);
//                 });
//         })
//         .then(film => { res.send(film); })
//         .catch(next);

//})

.put('/:id', (req, res, next) => {
    helper.parseBody(req)
        .then(film => {
            Film.findByIdAndUpdate(
                    req.params.id,
                    film, {
                        new: true,
                        runValidators: true
                    }
                )
                .then(film => {
                    res.send(film);
                });
        })
        .catch(next);
})

.delete('/:id', (req, res, next) => {
    Film.findByIdAndRemove(req.params.id)
        .then(deleted => {
            res.send({ deleted: !!deleted });
        })
        .catch(next);
});

module.exports = filmRouter;