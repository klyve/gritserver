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
  let user;
  let userid = jwt.verify(data.token, 'supersecret');
  console.log(data, userid);
  mongoose.model('UserModel').getUser({
    _id: userid
  }, function(err, data) {
    console.log(err, data)
  })

  // let groupData = {
  //   name: data.name,
  //   admins: [user],
  //   members: [user]
  // }
  //GroupModel.create(data, callback);
}
