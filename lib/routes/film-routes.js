const express = require('express');
const Router = express.Router;
const filmRouter = Router();
const Film = require('../models/film-schema');
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
});

module.exports = filmRouter;