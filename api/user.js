"use strict"

let bluebird  = require('bluebird'),
    User = require('../models/User.js'),
    jwt = require('jsonwebtoken');


module.exports = (api) => {

  api.route('/user/:id')
    .get((req, res) => {
      res.send("Get a user!")
    })

  api.route('/user/auth')
    .post((req, res) => {
      let token = jwt.sign({ uid: 'bullshit' }, 'supersecret');
      return res.send({
        status: 200,
        token,
      })

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
      // User.find({number: '95047857'}).exec(function(err, data) {
      //   console.log(err, data)
      // });
    })

}
