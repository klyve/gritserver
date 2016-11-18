"use strict";
let mongoose = require('mongoose');


var GroupSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      default: 'private'
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
  GroupModel.create(data, callback);
}
