"use strict";

//let db = require('./modules/database').getConnection();
let db = require('./modules/database').getConnection();
let Group = require('./models/Group');
let User = require('./models/User');
Group.remove({}, function( ){
  for(var i = 0; i < 10; ++i) {
    var b = Group.createGroup({
      name: 'Group '+i,
      bio: 'Hello world'+i,
      image: 'https://unsplash.it/400/400/?random',
      members: [],
      grouptype: 'public',
      admins: [],
      challenges: []
    }, function(err, data) {
      console.log("Created groups")
    });
  }
})
// User.remove({}, function() {
//   console.log("Removed all users");
//   User.createUser({
//     nick: 'klyve',
//     number: '95047857',
//     password: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
//
//   }, function(err, data) {
//     console.log("Created user");
//   })
// })
  // User.createUser({
  //   nick: 'klyve2',
  //   number: '95047857',
  //   password: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
  //
  // }, function(err, data) {
  //   console.log("Created user");
  // })
  // User.createUser({
  //   nick: 'klyve3',
  //   number: '95047857',
  //   password: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
  //
  // }, function(err, data) {
  //   console.log("Created user");
  // })
User.updateUser({
  _id: "5828053a08c62966ddebf235"
},{
  friends: ["5830cd21aa186438aac589f2", "5830cd21aa186438aac589f3"]
}, function(err, data) {

})


console.log("Completed seeding");
