const express = require('express');
const Router = express.Router;
const studioRouter = Router();
const Studio = require('../models/studio-schema');
const helper = require('../helper-functions');

studioRouter
    .get('/', (req, res, next) => {
        const query = {};
        if (req.query.type) {
            query.type = req.query.type;
        }
        Studio.find(query)
            .then(studios => res.send(studios))
            .catch(next);
    })
    .post('/', (req, res, next) => {
        helper.parseBody(req)
            .then(body => {
                return new Studio(body).save();
            })
            .then(studio => res.send(studio))
            .catch(next);
    });

module.exports = studioRouter;