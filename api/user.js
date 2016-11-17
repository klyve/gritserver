"use strict"

let bluebird  = require('bluebird'),
    User = require('../models/User.js'),
    jwt = require('jsonwebtoken'),
    hash = require('hash.js')


module.exports = (api) => {

  api.route('/user/:id')
    .get((req, res) => {
      res.send("Get a user!")
    })
  api.route('/user')
    .post((req, res) => {
      User.getUser({nick: req.body.nick}, function(err, data) {
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
            number: req.body.number,
            nick: req.body.nick,
            password: hash.sha256().update(req.data.password).digest('hex')
          }, function(err, data) {
            return res.send({
              status: 200,
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
