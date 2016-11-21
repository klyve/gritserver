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
<<<<<<< HEAD
        type: String,
        enum: ['gruppeinvitasjon', 'venneinvitasjon'],
        required: true,
=======
      type: String,
      required: true,
>>>>>>> 36e9e9418a6f2d900f45f640cd5d2204524c800b
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
<<<<<<< HEAD
                                      // All models should be called <name>Model for consistency.
let NotificationModel = module.exports = mongoose.model('NotificationModel', NotificationSchema, 'notifications');
=======

let NotificationModel = module.exports = mongoose.model('NotificationModel', NotificationSchema, 'notifications');

module.exports.add = function(data, callback) {
  NotificationModel.create(data, callback);
}
module.exports.getNotification = function(data, callback) {
  NotificationModel.findOne(data, callback);
}
module.exports.getNotifications = function(query, callback) {
  NotificationModel.find(query, callback);
}
>>>>>>> 36e9e9418a6f2d900f45f640cd5d2204524c800b
