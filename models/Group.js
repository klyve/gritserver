"use strict";
let mongoose = require('mongoose'),
    jwt = require('jsonwebtoken');


var GroupSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    bio: {
      type: String,
    },
    members: {
      type: Array,
    },
    admins: {
      type: Array,
    },
    challenges: {
      type: Array,
    },
    create_date: {
      type: Date,
      default: Date.now
    }
});

let GroupModel = module.exports = mongoose.model('GroupModel', GroupSchema);


module.exports.getGroups = function(uid, callback) {
  //mongoose.
  GroupModel.find(callback);
}

module.exports.createGroup = function(data, callback) {
  GroupModel.create(groupData, callback);
}
