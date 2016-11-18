"use strict"
let bluebird  = require('bluebird'),
    Group = require('../models/Group.js');


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
      Group.createGroup(req.body, function(err, groups) {
        res.send({
          err, groups
        })
      })
    })


}
