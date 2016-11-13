module.exports = function(mongoose) {

  var Schema = mongoose.Schema;
  var ObjectId = Schema.ObjectId;

  var User = new Schema({
    id: String,
    nick: String,
    password: String,
    image: String,
    bio: String,
    friends: Array,
    groups: Array,
  });

  var Group = new Schema({
    name: String,
    image: String,
    bio: String,
    members: Array,
    admins: Array,
    challenges: Array,
  });

  var Challenge = new Schema({
    id: String,
    name: String,
    image: String,
    bio: String,
    posts: Array,
    deadline: String,
  });

  var Post = new Schema({
    id: String,
    author: User,
    image: String,
    likes: Array,
    comments: Array,
  });

  var Comment = new Schema({
    id: String,
    author: User,
    text: String,
  });


  return {
    UserModel: mongoose.model('user', User),
    GroupModel: mongoose.model('group', Group),
    ChallengeModel: mongoose.model('challenge', Challenge),
    PostModel: mongoose.model('post', Post),
    CommentModel: mongoose.model('comment', Comment)
  }

}
