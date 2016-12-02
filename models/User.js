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

let UserModel = module.exports = mongoose.model('UserModel', UserSchema, 'users');

module.exports.getUsers = function(data, callback) {
  UserModel.find(data, callback);
}
module.exports.getUser = function(data, callback) {
  return UserModel.findById(data, {password: 0}).exec();
}
module.exports.findUser = function(data) {
  return UserModel.findOne(data, {password: 0}).exec();
}
module.exports.findUsers = function(data) {
  return UserModel.find(data, {password: 0}).exec();
}
module.exports.authUser = function(username, password) {
  return UserModel.findOne({
    number: username,
    password
  }, {password: 0}).exec()
}
module.exports.getFriends = function(data) {
  return UserModel.find({_id: {$in:data}}, {password: 0, options: 0, number: 0, friends: 0, groups: 0}).exec();
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
module.exports.leaveGroup = function(uid, gid, callback) {
  UserModel.findByIdAndUpdate(
    uid,
    {$pull: {"groups": gid}},
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
