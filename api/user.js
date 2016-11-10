"use strict"

let bluebird  = require('bluebird')





module.exports = (api) => {
  
  api.route('/user/:id')
    .get((req, res) => {
      res.send("Get a user!")
    })


}
