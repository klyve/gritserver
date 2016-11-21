"use strict"
let bluebird  = require('bluebird'),
    Group = require('../models/Group.js'),
    User = require('../models/User.js'),
    Challenge = require('../models/Challenge.js'),
    Leaderboard = require('../models/Leaderboard.js'),
    jwt = require('jsonwebtoken');


module.exports = (api) => {

  api.route('/groups/leave')
    .post((req, res) => {
      let id = req.body.groupid;
      let userid = jwt.verify(req.body.token, 'supersecret').uid;

      User.leaveGroup(userid, id, function(err, data) {
        if(err)
          return res.send({
            error: "Could not leave group"
          })
        Group.leaveGroup(userid, id, function(err, data) {
          if(err)
            return res.send({
              error: "Could not leave group!"
            })
          res.send(data);
        })
      })
    })
  api.route('/groups/getdata')
    .post((req, res) => {
      let id = req.body._id

      Group.getGroup({_id: id}, function(err, data) {
        if(!data)
          return res.send({
            error: "Could not get the group!"
          })
          console.log(data)
          let ret = {
            _id: data._id,
            name: data.name,
            grouptype: data.grouptype,
            image: data.image,
            bio: data.bio,
            members: [],
            admins: data.admins,
            challenges: [],
            leaderboard: [],
            create_date: data.create_date
          }

          User.getUsers({_id: {$in:data.members}}, function(err, memberData) {
            if(!data)
              return res.send(ret);
            if(err)
              console.log(err)
            console.log(data.members)
            memberData.map(member => {
              ret.members.push(member);
            })

            Challenge.getChallenges({_id: {$in:data.challenges}}, function(err, challengeData) {
              if(!data)
                return res.send(ret)

              if(err)
                console.log(err)

              challengeData.map(challenge => {
                ret.challenges.push(challenge);
              })

              Leaderboard.getLeaderboard({groupid: data._id}, function(err, leaderBoardData) {
                if(!data)
                  return res.send(ret);
                leaderBoardData.map(leaderData => {
                  ret.leaderboard.push(leaderData);
                })

                return res.send(ret);
              })

            })
          })

      })
    })
  api.route('/groups/challenge')
    .post((req, res) => {
      let name = req.body.name;
      let description = req.body.description;
      let time = req.body.time;
      let creator = jwt.verify(req.body.token, 'supersecret').uid;
      //let creator = req.body.token;
      let groupid = req.body._id;
      console.log(req.body)
      Challenge.createChallenge({
        name,
        description,
        creator,
        time,
      }, function(err, data) {
        if(!data)
          return res.send({
            error: "Could not create challenge",
            err
          })
        Group.addChallenge(groupid, data._id, function(err, cdata) {
          if(!cdata)
            return res.send({
              error: "Could not add challenge"
            })
          res.send(cdata);
        })
      })
    })

  api.route('/groups/search')
    .post((req, res) => {
      let text = req.body.search.text;
      if(text == "")
        return res.send({
          error: "",
          error_message: "Cannot do an empty search"
        })
      console.log(text);
      Group.getGroups({name: new RegExp('^(.*)'+text+'(.*)$', 'i')}, function(err, groups) {
        if(err)
          return res.send({
            error: true,
            "message": "/groups/search not available",
            err
          })
        return res.send({
          searchResults: groups
        })
      })
    })


  api.route('/groups/join')
    .post((req, res) => {
      let userid = jwt.verify(req.body.token, 'supersecret').uid;

      Group.joinGroup(req.body.id, userid, function(err, group) {
        if(err)
          return res.send({
            error: true,
            message: "Could not join group!",
            err
          })

        User.joinGroup(userid, req.body._id, function(err, status) {
          if(err)
            return res.send({
              error: true,
              message: "Could not join group!",
              err
            })
          return res.send({
            status: 200,
            message: "Group joined"
          })
        })
      })
    })

  api.route('/groups')

    .get((req, res) => {
      Group.getGroups({}, function(err, groups) {
        if(err)
          return res.send({
            error: true,
            "message": "/groups not available",
            err
          })
        res.send({
          groups
        })
      })
    })

    .post((req, res) => {

      let userid = jwt.verify(req.body.token, 'supersecret');
      User.getUser({
        _id: userid.uid
      }, function(err, usr) {
        if(err)
          return res.send({
            "error": true,
            "msg": "Could not find user",
          })
          let groupData = {
            name: req.body.name,
            grouptype: req.body.type,
            admins: [usr._id],
            members: [usr._id],
            bio: 'Hello world',
            image: 'https://unsplash.it/400/400/?random',
            challenges: []
          }
          Group.createGroup(groupData, function(err, grp) {

            if(err)
              return res.send({
                "error": true,
                "msg": "Could not create group"
              })
              //let grp = usr[0].groups.push(grp._id);
              //let grp = [],
              User.joinGroup(usr._id, grp._id, function(err, data) {
                if(err)
                  return res.send({
                    "error": true,
                    "msg": "Could not join the created group"
                  })
                res.send({
                  "status": 200,
                  "message": "Group created",
                  "group": grp
                })
              })
          }) // Create group end
      }) // Get user end


    })

    api.route('/groups/:id')
      .post((req, res) => {
        Group.getGroups({_id: req.params.id}, function(err, groups) {
          if(err)
            return res.send({
              error: true,
              "message": "/groups/:id not available",
              err
            })
          return res.send({
            groups
          })
        })
      })

}
