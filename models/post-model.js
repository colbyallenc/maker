const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Comment = require('./comment-model.js');

const PostSchema = Schema({
      content: String,
      creatorId: { type: Schema.Types.ObjectId },
      picPath: String,
      picName: String,

      comments: [ {
      content: String,
      authorId: { type: Schema.Types.ObjectId },
      imagePath: String,
      } ]
  });

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
