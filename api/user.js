"use strict"

let bluebird  = require('bluebird'),
    User = require('../models/User.js'),
    Group = require('../models/Group.js'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto')


module.exports = (api) => {

  api.route('/user/:id')
    .get((req, res) => {
      console.log(req.params.id)
      User.getUser({_id: req.params.id}, function(err, data) {
          return res.send({
            data, err
          })
      })
    })
  api.route('/user/data')
    .post((req, res) => {
      //let userid = jwt.verify(req.body.token, 'supersecret');
      let userid = req.body.token; // For debugging
      console.log(userid)

      User.getUser({_id: userid}, function(err,data) {
        if(err || !data)
          return res.send({
            error: true,
            message: "Could not find the user"
          })
        let usr = data;
        User.getUsers({_id: {$in:data.friends}}, function(err, friendsData) {
          if(friendsData)
            data.friends = friendsData;

            Group.getGroups({_id: {$in:data.groups}}, function(err, groupsData) {
              if(groupsData)
                data.groups = groupsData;

              return res.send(usr)
            })

        })


      })
    })
  api.route('/user')
    .post((req, res) => {
      User.getUser({nick: req.body.username}, function(err, data) {
        if(data.length) {
          return res.send({
            error: true,
            error_msg: "Nickname in use",
          })
        }
        User.getUser({number: req.body.number}, function(err, data) {
          if(data.length)
            return res.send({
              error: true,
              error_msg: "Phone number in use",
            })

          User.createUser({
            nick: req.body.username,
            number: req.body.number,
            password: req.body.password
          }, function(err, data) {
            if(err) {
              return res.send({
                data: req.body,
                err,
              })
            }
            let token = jwt.sign({ uid: data._id }, 'supersecret');
            return res.send({
              data,
              status: 200,
              token,
              msg: "User created!"
            })
          })
        })
      })
    })
  api.route('/user/notifications')
    .post((req, res) => {
      res.send({
        notifications: Math.floor(Math.random() * 6),
      })
    })
  api.route('/user/auth')
    .post((req, res) => {
      // let token = jwt.sign({ uid: 'bullshit' }, 'supersecret');
      // return res.send({
      //   status: 200,
      //   token,
      // })

      User.getUser({
        number: req.body.username,
        password: req.body.password,
      }, function(err, data) {
        if(err || !data.length) {
          res.send({error: true});
        }else {
          let token = jwt.sign({ uid: data[0]._id }, 'supersecret');
          res.send({
            status: 200,
            token,
          })
        }
      })
    })

}
