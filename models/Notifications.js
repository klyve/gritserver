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
        enum: ['gruppeinvitasjon', 'venneinvitasjon'], 
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        required: true,
    },
    read: {
        type: Boolean,
        default: false,
        required: true,
    },
    message: {
        type: String,
        maxLength: 3000,
        required: true,
    },

});
                                                                                                
let NotificationModel = module.exports = mongoose.model('NotificationModel', NotificationSchema, 'notifications');