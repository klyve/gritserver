"use strict"
let bluebird  = require('bluebird'),
    Group = require('../models/Group.js'),
    User = require('../models/User.js'),
    jwt = require('jsonwebtoken');


module.exports = (api) => {

  api.route('/groups/:id')
    .post((req, res) => {
      Group.getGroups({_id: req.params.id}, function(err, groups) {
        if(err)
          res.send({
            error: true,
            "message": "Could not get the group",
            err
          })
        res.send({
          groups
        })
      })
    })

  api.route('/groups')
    .get((req, res) => {

      Group.getGroups({}, function(err, groups) {
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
            type: req.body.type,
            admins: [usr[0]._id],
            members: [usr[0]._id]
          }
          Group.createGroup(groupData, function(err, groups) {

            if(err)
              return res.send({
                "error": true,
                "msg": "Could not create group"
              })
              console.log(usr);
              User.updateUser({
                _id: usr[0]._id
              },{
                groups: usr[0].groups.push(groups._id),
              }, function(err, data) {
                if(err)
                  return res.send({
                    "error": true,
                    "msg": "Could not join the created group"
                  })
                res.send({
                  "status": 200,
                  "message": "Group created",
                  "group": groups
                })
              })
          }) // Create group end
      }) // Get user end


    })


}
