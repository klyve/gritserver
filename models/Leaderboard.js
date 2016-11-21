"use strict";

let mongoose = require('mongoose');

var LeaderboardSchema = mongoose.Schema({

    groupid: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0
    }

});

let LeaderboardModel = module.exports = mongoose.model('LeaderboardModel', LeaderboardSchema, 'leaderboard');


module.exports.getLeaderboard = function(data, callback) {
  LeaderboardModel.find(data, callback);
}
