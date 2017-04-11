const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
        },
        state: {
            type: String
        },
        country: {
            type: String
        }
    }
});

const Studio = mongoose.model('Studio', schema);
module.exports = Studio;