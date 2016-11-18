"use strict"
let bluebird  = require('bluebird'),
    Group = require('../models/Group.js'),
    User = require('../models/User.js');


module.exports = (api) => {

  api.route('/groups')
    .get((req, res) => {

      Group.getGroups('i', function(err, groups) {
        res.send({
          groups
        })
      });

    })
    .post((req, res) => {

      let userid = jwt.verify(req.body.token, 'supersecret');
      User.getUser({
        _id: userid.uid
      }, function(err, usr) {
        if(err)
          return res.send({
            "error": true,
            "msg": "Could not find user",
          })
          let groupData = {
            name: req.body.name,
            admins: [usr[0]._id],
            members: [usr[0]._id]
          }
          Group.createGroup(req.body, function(err, groups) {

            if(err)
              return res.send({
                "error": true,
                "msg": "Could not create group"
              })

              User.updateUser({
                _id: usr[0]._id
              },{
                groups: usr[0].groups.push(group._id),
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
          }) // Create group end
      }) // Get user end


    })


}
