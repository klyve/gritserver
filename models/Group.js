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

  mongoose.model('UserModel').getUser({
    _id: userid.uid
  }, function(err, user) {
    if(err)
      return res.send({
        "error": true,
        "msg": "Could not find user",
      })
      let groupData = {
        name: data.name,
        admins: [user[0]._id],
        members: [user[0]._id]
      }
      GroupModel.create(groupData, function(err, group) {
        if(err)
          return res.send({
            "error": true,
            "msg": "Could not create group"
          })
          mongoose.model('UserModel').updateUser({
            _id: user[0]._id
          },{
            groups:user[0].groups.push(group._id),
          }, function(err, data) {
            if(err)
              return res.send({
                "error": true,
                "msg": "Could not join the created group"
              })
            res.send({
              "status": 200,
              "message": "Group created",
              "groupid": group._id
            })
          })
      });
  })


  //GroupModel.create(data, callback);
}
