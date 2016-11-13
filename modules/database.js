"use strict"
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/challenge')


exports.getConnection = function() {
  return {mongoose};
};
