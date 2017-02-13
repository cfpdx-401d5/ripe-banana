const express = require('express');
const Router = express.Router;
const actorRouter = Router();
const Actor = require('../models/actor-schema');

module.exports = actorRouter;

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', data => body += data);
        req.on('error', err => reject(err));
        req.on('end', () => {
            const actor = JSON.parse(body);
            resolve(actor);
        });
    });
};

actorRouter
    .get('/', (req, res, next) => {
        const query = {};
        if(req.query.type) {
            query.type = req.query.type;
        }
        Actor.find(query)
            .then(actors => res.send(actors))
            .catch(next)
    });

    // .post('/', (req, res, next) => {
    //     parseBody(req)
    //         .then(body => {
    //             return new Actor(body).save()
    //         })
    //         .then(actor => res.send(actor))
    //         .catch(next);
    // });