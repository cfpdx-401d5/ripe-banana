const express = require('express');
const Router = express.Router;
const actorRouter = Router();
const Actor = require('../models/actor-schema');
const helper = require('../helper-functions');

actorRouter
    .get('/', (req, res, next) => {
        const query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        Actor.find(query)
            .then(actors => res.send(actors))
            .catch(next);
    })

.post('/', (req, res, next) => {
    helper.parseBody(req)
        .then(body => {
            return new Actor(body).save();
        })
        .then(actor => { res.send(actor); })
        .catch(next);
});

module.exports = actorRouter;