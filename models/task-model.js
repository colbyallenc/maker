const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const Comment = require('./comment-model.js');
const User     = require('./user-model.js');
const Group = require('./group-model.js');

const taskSchema = new Schema({
      content: String,
      dueBy: String,
      authorId: { type: Schema.Types.ObjectId },
      comments: [ Comment.schema ],
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
