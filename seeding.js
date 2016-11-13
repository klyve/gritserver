"use strict";

//let db = require('./modules/database').getConnection();
let db = require('./modules/database').getConnection();
let Group = require('./models/Group');

for(var i = 0; i < 10; ++i) {
  var b = Group.createGroup({
    name: 'Group '+i,
    bio: 'Hello world'+i,
    image: 'https://unsplash.it/400/400/?random',
    members: [],
    admins: [],
    challenges: []
  }, function(err, data) {
    console.log(err, data);
  });
}


console.log("Completed seeding");
