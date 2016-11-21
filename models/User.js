"use strict";
let mongoose = require('mongoose');



var UserSchema = mongoose.Schema({
    nick: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    password: {
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
    groups: {
      type: Array,
      default: []
    },
    friends: {
      type: Array,
      default: []
    },
    create_date: {
      type: Date,
      default: Date.now,
    },

    options: {
      friendRequest: {
        type: Boolean,
        default: true,
      },
      groupRequest: {
        type: Boolean,
        default: true,
      },
      pushNotifications: {
        type: Boolean,
        default: true
      }
    }
});
                                // All models should be called <name>Model for consistency.
let UserModel = module.exports = mongoose.model('UserModel', UserSchema, 'users');   // module.exports makes the variable global

module.exports.getUsers = function(data, callback) {
  UserModel.find(data, callback);
}
module.exports.getUser = function(data, callback) {
  UserModel.findOne(data, callback);
}
module.exports.updateUser = function(user, data, callback) {
  UserModel.update(user, { $set: data }, callback);
}
module.exports.removeFriend = function(id, fid, callback) {
  UserModel.findByIdAndUpdate(
    id,
    {$pull: {"friends": fid}},
    {safe: true, upsert: true},
    callback
  )
}
module.exports.addFriend = function(id, fid, callback) {
  UserModel.findByIdAndUpdate(
    id,
    {$push: {"friends": fid}},
    {safe: true, upsert: true},
    callback
  )
}
module.exports.joinGroup = function(id, gid, callback) {
  UserModel.findByIdAndUpdate(
    id,
    {$push: {"groups": gid}},
    {safe: true, upsert: true},
    callback
  )
}
module.exports.updateById = function(id, data, callback) {
//   UserModel.findByIdAndUpdate(
//     id,
//     {$push: {"messages": {title: title, msg: msg}}},
//     {safe: true, upsert: true},
//     function(err, model) {
//         console.log(err);
//     }
// );
}
module.exports.createUser = function(data, callback) {
  UserModel.create(data, callback);
}
