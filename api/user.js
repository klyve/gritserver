"use strict"

let bluebird  = require('bluebird'),
    User = require('../models/User.js'),
    Notifications = require('../models/Notifications.js'),
    Group = require('../models/Group.js'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto')


module.exports = (api) => {
  api.route('/user/addfriend')
    .post((req, res) => {
      let userid = jwt.verify(req.body.token, 'supersecret').uid;
      //let userid = req.body.token;
      let friend = req.body._id;
      Notifications.getNotification({
        sender: friend,
        reciever: userid,
        type: "ADD_FRIEND",
        read: false
      }, function(err, data) {
        if(data) {
          Notifications.update({_id: data._id},{
            sender: friend,
            reciever: userid,
            type: "ADD_FRIEND",
            read: true,
          }, function(err, data) {
              User.addFriend(userid, friend, function(err, data) {
                if(!data)
                  return res.send({
                    error: true,
                    error_message: "Could not add friend"
                  })
                User.addFriend(friend, userid, function(err, data) {
                  if(!data)
                    return res.send({
                      error: true,
                      error_message: "Could not add friend"
                    })
                  return res.send({
                    status: 200,
                    message: "Friend added!"
                  })
                })
              })
          })
        }else {
          Notifications.add({
            sender: userid,
            reciever: friend,
            type: "ADD_FRIEND",
            message: "",
          }, function(err, data) {
            console.log(err, data);
            return res.send({
              status: 200,
              message: "Friend request sent!"
            })
          })
        }

      })
    })
  api.route('/user/removeFriend')
    .post((req, res) => {
      //let token = req.body.token;
      let token = jwt.verify(req.body.token, 'supersecret').uid;
      let friend = req.body._id;
      User.removeFriend(token, friend, function(err, data) {
        if(err)
          return res.send({
            error: true,
            error_message: "Could not remove friend"
          })
        User.removeFriend(friend, token, function(err, data) {
          if(err)
            return res.send({
              error: true,
              error_message: "Could not remove friend"
            })
          return res.send({
            status: 200,
            message: "Friend removed"
          })
        })
      })
    })
  api.route('/user/:id')
    .get((req, res) => {
      console.log(req.params.id)
      User.getUser({_id: req.params.id}, function(err, data) {
          return res.send({
            data, err
          })
      })
    })
  api.route('/user/find')
    .post((req, res) => {
      let text = req.body.search.text;
      User.getUsers({nick:  new RegExp('^'+text+'(.*)$', "i")}, function(err, data) {
        console.log(err, data);
        if(err)
          return res.send({
            "error": true,
            "error_message": "Could not fetch users"
          })

        return res.send({
          users: data,
          search: req.body.search
        })
      })
    })
  api.route('/user/data')
    .post((req, res) => {
      let userid = jwt.verify(req.body.token, 'supersecret').uid;
      //let userid = req.body.token; // For debugging

      //userid.toString()


      User.getUser({_id: userid}, function(err,data) {
        //console.log(err, data);
        if(err || !data)
          return res.send({
            error: true,
            message: "Could not find the user"
          })

        let usr = data;
        User.getUsers({_id: {$in:data.friends}}, function(err, friendsData) {
          if(friendsData)
            data.friends = friendsData;

            Group.getGroups({_id: {$in:data.groups}}, function(err, groupsData) {
              if(groupsData)
                data.groups = groupsData;

              return res.send(usr)
            })

        })


      })
    })
  api.route('/user')
    .post((req, res) => {
      User.getUser({nick: req.body.username}, function(err, data) {
        if(data) {
          return res.send({
            error: true,
            error_msg: "Nickname in use",
          })
        }
        User.getUser({number: req.body.number}, function(err, data) {
          if(data)
            return res.send({
              error: true,
              error_msg: "Phone number in use",
            })

          User.createUser({
            nick: req.body.username,
            number: req.body.number,
            password: req.body.password,
            bio: "",
            image: "https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-9/13346786_857665671010201_2266055122162485673_n.jpg?oh=058821f76744a088aff31f6813d19952&oe=58C41549",
            friends: [],
            groups: []
          }, function(err, data) {
            if(err) {
              return res.send({
                data: req.body,
                err,
              })
            }
            let token = jwt.sign({ uid: data._id }, 'supersecret');
            return res.send({
              data,
              status: 200,
              token,
              msg: "User created!"
            })
          })
        })
      })
    })
  api.route('/user/notifications')
    .post((req, res) => {
      //let token = req.body.token;
      let token = jwt.verify(req.body.token, 'supersecret').uid;
      Notifications.getNotifications({
        reciever: token,
        read: false,
      }, function(err, data) {
        if(!data.length)
          return res.send({
            notifications: [],
          })
          let users = []
          let sendData = [];
          data.map(notification => {
            users.push(notification.sender);
            sendData.push({
              _id: notification.sender,
              reciever: notification.reciever,
              sender: {},
              type: notification.type,
              message: notification.message,
              timestamp: notification.timestamp,
              read: notification.read,
            })
          })
          console.log(data);


          User.getUsers({_id: {$in:users}}, function(err, friendsData) {
            if(err)
              return res.send({
                notifications: []
              })
            friendsData.map((friend, i) => {
              sendData[i].sender = friend;
            })
            console.log(sendData);

            return res.send({
              notifications: sendData
            })
          })


      })
    })
  api.route('/user/auth')
    .post((req, res) => {
      // let token = jwt.sign({ uid: 'bullshit' }, 'supersecret');
      // return res.send({
      //   status: 200,
      //   token,
      // })

      User.getUser({
        number: req.body.username,
        password: req.body.password,
      }, function(err, data) {
        if(err || !data) {
          res.send({error: true});
        }else {
          let token = jwt.sign({ uid: data._id }, 'supersecret');
          let d = {
            status: 200,
            token,
          }
          res.send(d)
        }
      })
    })

}
