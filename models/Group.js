"use strict";
let mongoose = require('mongoose');


var GroupSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    grouptype: {
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
                                // All models should be called <name>Model for consistency.
let GroupModel = module.exports = mongoose.model('GroupModel', GroupSchema, 'groups');

module.exports.joinGroup = function(id, mid, callback) {
  GroupModel.findByIdAndUpdate(
    id,
    {$push: {"members": mid}},
    {safe: true, upsert: true},
    callback
  )
}
module.exports.getGroups = function(query, callback) {
  GroupModel.find(query, callback);
}

module.exports.getGroup = function(query, callback) {
  GroupModel.findOne(query, callback);
}
module.exports.createGroup = function(data, callback) {
  GroupModel.create(data, callback);
}
