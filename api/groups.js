"use strict"

let bluebird  = require('bluebird')

function Group(){
  this.id;
  this.name;
  this.image;
  this.bio;
  this.members;
  this.challenges;
  this.unread;
}

var t1 = new Group();
  t1.id = 69;
  t1.name = 'Jonas er her <3';
  t1.image = 'https://scontent-arn2-1.xx.fbcdn.net/t31.0-8/14138130_294308567597428_2912771272278186301_o.jpg'
  t1.bio = 'Dette er veldig lol';
  t1.unread = 69;

var groups = [t1];

module.exports = (api) => {

  api.route('/groups')
    .get((req, res) => {
      res.send({
        groups
      })
    })


}
