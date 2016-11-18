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
    },
    bio: {
      type: String,
    },
    groups: {
      type: Array,
    },
    friends: {
      type: Array,
    },
    create_date: {
      type: Date,
      default: Date.now,
    }
});

let UserModel = module.exports = mongoose.model('UserModel', UserSchema, 'users');


module.exports.getUsers = function(uid, callback) {
  UserModel.find(callback);
}
module.exports.getUser = function(data, callback) {
  UserModel.find(data, callback);
}
module.exports.updateUser = function(user, data, callback) {
  UserModel.update(user, data, callback);
}
module.exports.createUser = function(data, callback) {
  UserModel.create(data, callback);
}
