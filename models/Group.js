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
      default: ""
    },
    bio: {
      type: String,
      default: ""
    },
    members: {
      type: Array,
      default: [],
    },
    leaderboard: [{
      id: {
        type: String,
      },
      points: {
        type: Number,
        default: 0
      }
    }],
    admins: {
      type: Array,
      default: []
    },
    challenges: {
      type: Array,
      default: []
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
    {$push: {members: mid}},
    {upsert: true},
    callback
  )
}
module.exports.addChallenge = function(id, cid, callback) {
  GroupModel.findByIdAndUpdate(
    id,
    {$push: {"challenges": cid}},
    {safe: true, upsert: true},
    callback
  )
}
module.exports.leaveGroup = function(uid, gid, callback) {
  GroupModel.findByIdAndUpdate(
    gid,
    {$pull: {"members": uid}},
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
