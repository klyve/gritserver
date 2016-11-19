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
            grouptype: req.body.type,
            admins: [usr[0]._id],
            members: [usr[0]._id],
            bio: 'Hello world',
            image: 'https://unsplash.it/400/400/?random',
            challenges: []
          }
          Group.createGroup(groupData, function(err, grp) {

            if(err)
              return res.send({
                "error": true,
                "msg": "Could not create group"
              })
              console.log(usr);
              //let grp = usr[0].groups.push(grp._id);
              let grp = [],
              console.log(grp)
              User.updateUser({
                _id: usr[0]._id
              },{
                groups: grp,
              }, function(err, data) {
                if(err)
                  return res.send({
                    "error": true,
                    "msg": "Could not join the created group"
                  })
                res.send({
                  "status": 200,
                  "message": "Group created",
                  "group": grp
                })
              })
          }) // Create group end
      }) // Get user end


    })


}
