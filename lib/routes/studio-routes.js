const express = require('express');
const Router = express.Router;
const studioRouter = Router();
const Studio = require('../models/studio-schema');

module.exports = studioRouter;

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


studioRouter
    .get('/', (req, res, next) => {
        const query = {};
        if(req.query.type) {
            query.type = req.query.type;
        }
        Studio.find(query)
            .then(studios => res.send(studios))
            .catch(next)
    })
    .post('/', (req, res, next) => {
        parseBody(req)
            .then(body => {
                return new Studio(body).save()
            })
            .then(studio => res.send(studio))
            .catch(next)
    });