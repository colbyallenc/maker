const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  content: {
    type: String,
    required: [true, 'the pone name is required']
  },
  name: {
    type: String,
    required: [true, 'the pone name is required']
  },
  image: {
    type: String,
    default: ''},
  specs: {
    type: Array,
    default: []
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
