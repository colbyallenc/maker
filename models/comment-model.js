const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('./user-model.js');

const CommentsSchema = new Schema({
     content: { String },
     authorId: { type: Schema.Types.ObjectId },
    });

const Comment = mongoose.model('Comment', CommentsSchema);

module.exports = Comment;
