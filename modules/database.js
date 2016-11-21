"use strict"
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/challenge')             // Why connect here when it also happens in app.js


exports.getConnection = function() {
  return {mongoose};
};
