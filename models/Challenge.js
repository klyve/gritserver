"use strict";
let mongoose = require('mongoose');


var ChallengeSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    },
    images: { 
        type: Array,       // valid url
        default: [],
    },
    description: {
        type: String,
        maxlength: 3000,
    },
    endtime: {
        type: Date,
        required: true,
        default: ( Date.now() / 1000 * 3600 * 24 ),
    },

});

let ChallangeModel = module.exports = mongoose.model('ChallangeModel', ChallangeSchema, 'challanges');