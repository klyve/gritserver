"use strict";

let mongoose = require('mongoose');

var ChallengeSchema = mongoose.Schema({

    name: {
      type: String,
      required: true,
      default: ""
    },
    creator: {
      type: String,
      required: true,
      default: ""
    },
    images: { 
      type: Array,
      default: [],
    },
    description: {
      type: String,
      default: ""
    },
    time: {
      type: Date,
      required: true,
    },

});
                                    // All models should be called <name>Model for consistency.

let ChallengeModel = module.exports = mongoose.model('ChallengeModel', ChallengeSchema, 'challenges');

module.exports.createChallenge = function(data, callback) {
  ChallengeModel.create(data, callback);
}

module.exports.getChallenge = function(data, callback) {
  ChallengeModel.findOne(data, callback);
}
module.exports.getChallenges = function(data, callback) {
  ChallengeModel.find(data, callback);
}
