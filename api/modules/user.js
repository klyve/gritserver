"use strict"

let jwt = require('jsonwebtoken')
let debug = false;
let User = {

  getToken: function(token) {
    if(process.env.NODE_ENV == 'development' && debug == true)
      return token;
    else
      return jwt.verify(token, 'supersecret').uid;
  },

  getFriends: function(user) {

  }



}


module.exports = User;
