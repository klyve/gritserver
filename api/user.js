"use strict"

let bluebird  = require('bluebird'),
    User = require('../models/User.js'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto')


module.exports = (api) => {

  api.route('/user/:id')
    .get((req, res) => {
      User.getUser({nick: req.body.username}, function(err, data) {
        if(data.length) {
          return res.send({
            data
          })
        }
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
