const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Comment = require('./comment-model.js');
const Group = require('./group-model.js');

const PostSchema = new Schema({
      content: String,
      authorId: { type: Schema.Types.ObjectId },
      // picPath: String,
      // picName: String,
      // comments: [ Comment.schema ]
  });

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
