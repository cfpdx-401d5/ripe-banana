const express = require('express');
const Router = express.Router;
const studioRouter = Router();
const Studio = require('../models/studio-schema');
const Film = require('../models/studio-schema');
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
    })

    .get('/:id', (req, res) => {
        Studio.findById(req.params.id)
            .then(studio => {
                if(!studio) {
                    res.status = 404;
                    res.send({ error: `${res.status} CANNOT FIND ID: ${req.params.id}`});
                } else {
                    res.send(studio);
                }
            });
    })
    .put('/:id', (req, res) => {
        helper.parseBody(req)
            .then(studio => {
                return Studio.findByIdAndUpdate(
                    req.params.id,
                    studio,
                    { new: true, runValidators: true }
                );
            })
            .then(studio => {
                res.send(studio)
            })
    })
    .delete('/:id', (req,res,next) => {
        const id = req.params.id;
        Studio.findById(id)
            .then(studio => {
                if(!studio) {
                    res.status(404).send({ error: `CANNOT FIND ID ${id} TO REMOVE`})
                } else {
                    Film.find({studio: id}).count()
                        .then(results => {
                            if(results === 0) {
                                Studio.findByIdAndRemove(id)
                                    .then(deletedStudio => {
                                        res.send({ deleted: !!deletedStudio})
                                    });
                            } else {
                                res.staus(400).send({ error: 'CANNOT REMOVE STUDIO WITH FILM'})
                            }
                        })
                        .catch(next)
                }
            })
            .catch(next);
    });


module.exports = studioRouter;
