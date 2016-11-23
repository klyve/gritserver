"use strict";

let mongoose = require('mongoose');

var ImageSchema = mongoose.Schema({
    src: {
      type: String,
      default: "",
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Array,
      default: [],
    }
});

let ImageModel = module.exports = mongoose.model('ImageModel', ImageSchema, 'images');

module.exports.createImage = function(data, callback) {
  ImageModel.create(data, callback);
}
module.exports.getImage = function(data, callback) {
  ImageModel.findOne(data, callback);
}
// module.exports.getLeaderboard = function(data, callback) {
//   LeaderboardModel.find(data, callback);
// }
