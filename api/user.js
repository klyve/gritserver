"use strict"

let bluebird  = require('bluebird')

function User(){
  this.id;
  this.name;
  this.image;
  this.bio;
  this.members;
  this.challenges;
}



module.exports = (api) => {

  api.route('/user/:id')
    .get((req, res) => {
      res.send("Get a user!")
    })


}
