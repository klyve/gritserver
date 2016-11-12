"use strict"

let express     = require('express'),
    bodyParser  = require('body-parser'),
    app         = express(),
    api =       express.Router()

var mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/challenge');

let models = require('./models')(mongoose);


// Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/groups', (req, res) => {
  res.send("drit");
})

app.post('/newuser', (req, res) => {
  let nick = req.body.nick;
  let password = req.body.password;

  var newUser = new models.UserModel({
    nick: nick,
    password: password,
    image: '',
    bio: '',
    friends: [],
    groups: []
  })
  newUser.save();
});

app.post('/newgroup', (req, res) => {
  let name = req.body.name;

  var newGroup = new models.GroupModel({
    id, name
  })
  newGroup.save();
});

app.post('/newchallenge', (req, res) => {
  let id = req.body.id;
  let name = req.body.name;
  let bio = req.body.bio;
  let deadline = req.body.deadline;

  var newChallenge = new models.ChallengeModel({
    id, name, bio, deadline
  })
  newChallenge.save();
});

app.post('/newpost', (req, res) => {
  let id = req.body.id;
  let author = req.body.author;
  let image = req.body.image;

  var newPost = new models.PostModel({
    id, author, image
  })
  newPost.save();
});

app.post('/newcomment', (req, res) => {
  let id = req.body.id;
  let author = req.body.author;
  let text = req.body.text;

  var newComment = new models.CommentModel({
    id, author, text
  })
  newComment.save();
});





app.get('/adduser/:id', (req, res) => {
  var newUser = new models.CommentModel({
    id: req.params.id,
  })
    newUser.save();
    res.send(true);
})

// Enable the api
app.use('/api', api)

app.all('*', (req,res) => {
  res.send({
    "error": "bad_request",
    "error_message": "Bad request, 404 not found"
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})
