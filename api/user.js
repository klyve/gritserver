"use strict"

let bluebird  = require('bluebird'),
    User = require('../models/User.js'),
    Notifications = require('../models/Notifications.js'),
    Group = require('../models/Group.js'),
    Image = require('../models/Image.js'),
    jwt = require('jsonwebtoken'),
    crypto = require('crypto'),
    fs = require('fs')

var uuid = require('node-uuid');



module.exports = (api) => {

  api.route('/user/picture')
    .post((req, res) => {
      let imageData = req.body.imageData;
      let token = jwt.verify(req.body.token, 'supersecret').uid;
      let base64Data = imageData.replace(/^data:image\/jpg;base64,/, "");
      let name = uuid.v4();
      fs.writeFile('./public/'+name+".jpg", base64Data, 'base64', function(err) {
        if(err)
          return res.send({
            error: "Could not upload image"
          })

          User.updateUser({
            _id: token
          },{
            image: '/images/'+name+".jpg"
          }, function(err, data) {
            if(err)
              return res.send({
                error: "Could not upload image"
              })
            return res.send({
              success: "YES!"
            })
          })
      });
    })

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
  api.route('/user/update')
    .post((req, res) => {
      let userid = jwt.verify(req.body.token, 'supersecret').uid;

      let options = {}
      options['options.'+req.body.data.type] = req.body.data.value;
      User.updateUser(userid, options, function(err, data){
        if(err)
          res.send({
            error: true,
            error_message: "Cant update user"
          })
        res.send({
          data
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
            "error_message": "Could not fetch users",
          })

        return res.send({
          users: data,
          search: req.body.search
        })
      })
    })
  api.route('/user/data')
    .post((req, res) => {
      if(!req.body.token)
        return res.send({
          error: "No usertoken"
        })
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


        let usr = {
          _id: data._id,
          nick: data.nick,
          number: data.number,
          options: data.options,
          create_date: data.create_date,
          friends: data.friends,
          groups: data.groups,
          bio: data.bio,
          image: data.image,
          notifications: []
        };
        User.getUsers({_id: {$in:usr.friends}}, function(err, friendsData) {
          if(friendsData)
            usr.friends = friendsData;

            Group.getGroups({_id: {$in:usr.groups}}, function(err, groupsData) {
              if(groupsData)
                usr.groups = groupsData;
                Notifications.getNotifications({
                  reciever: userid,
                  read: false,
                }, function(err, notificationData) {
                    if(err)
                      return res.send({
                        err
                      })
                    let users = []
                    let sendData = [];
                    notificationData.map(notification => {
                      users.push(notification.sender);
                      sendData.push({
                        _id: notification.sender,
                        reciever: notification.reciever,
                        senderId: notification.sender,
                        sender: {},
                        type: notification.type,
                        message: notification.message,
                        timestamp: notification.timestamp,
                        read: notification.read,
                      })
                    })


                    User.getUsers({_id: {$in:users}}, function(err, friendsData) {
                      if(err)
                        return res.send({
                          error: "ERROR!"
                        })
                      sendData.map(notification => {
                        friendsData.map((friend, i) => {
                          if(notification.senderId == friend._id) {
                            notification.sender = friend;
                          }
                        })
                      })
                      sendData.map(udata => {
                        usr.notifications.push(udata);
                      })

                      return res.send(usr)
                    })

                })


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
            image: "/images/user.jpg",
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
              senderId: notification.sender,
              sender: {},
              type: notification.type,
              message: notification.message,
              timestamp: notification.timestamp,
              read: notification.read,
            })
          })


          User.getUsers({_id: {$in:users}}, function(err, friendsData) {
            if(err)
              return res.send({
                notifications: []
              })
            sendData.map(notification => {
              friendsData.map((friend, i) => {
                if(notification.senderId == friend._id) {
                  notification.sender = friend;
                }
              })
            })


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
