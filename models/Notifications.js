"use strict";
let mongoose = require('mongoose');


var NotificationSchema = mongoose.Schema({

    sender: {
      type: String,
      required: true,
      maxLength: 255,
    },
    reciever: {
      type: String,
      required: true,
      maxLength: 255,
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      maxLength: 3000,
    },
    read: {
      type: Boolean,
      default: false,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
      required: true,
    },

});

let NotificationModel = module.exports = mongoose.model('NotificationModel', NotificationSchema, 'notifications');

module.exports.add = function(data, callback) {
  NotificationModel.create(data, callback);
}
module.exports.getNotification = function(data, callback) {
  NotificationModel.findOne(data, callback);
}

module.exports.getUserNotifications = function(userid) {
  return NotificationModel.find({
    reciever: userid,
    read: false
  }).exec();
}
module.exports.getNotifications = function(query, callback) {
  NotificationModel.find(query, callback);
}

module.exports.setRead = function(id, callback) {
  NotificationModel.remove(
    {_id: id},
    callback
  )
}
