const express = require('express');
const Router = express.Router;
const actorRouter = Router();
const Actor = require('../models/actor-schema');
const Film = require('../models/film-schema');
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
    })
    .get('/:id', (req, res) => {
        Actor.findById(req.params.id)
            .then(actor => {
                if(!actor) {
                    res.status(404).send(`CANNOT FIND ID ${req.params.id}`);
                } else {
                    res.send(actor);
                }
            });
    })
    .put('/:id', (req, res) => {
        helper.parseBody(req)
            .then(actor => {
                return Actor.findByIdAndUpdate(
                    req.params.id,
                    actor,
                    { new: true, runValidators: true} 
                );
            })
            .then(actor => {
                res.send(actor);
            });

    })
    .delete('/:id', (req, res, next) => {
        const id = req.params.id;
        Actor.findById(id)
            .then(actor => {           
                if(!actor) {
                    res.status(404).send({'error': `CANNOT FIND ID ${id} TO REMOVE`});
                } else {
                    Film.find({actors: id}).count()
                        .then(results => {
                            if(results === 0){
                                Actor.findByIdAndRemove(id)
                                    .then(deletedActor =>
                                        res.send({deleted: !!deletedActor})
                                    );
                            } else {
                                res.status(400).send({'error': 'CANNOT REMOVE ACTOR IN FILM'});
                            }
                        })
                        .catch(next);  
                }
            })
            .catch(next);
    });
module.exports = actorRouter;