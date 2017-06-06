const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
// const Comment = require('./comment-model.js');
const User     = require('./user-model.js');
const Group = require('./group-model.js');

const memberSchema = new Schema({
      content: String,
      memberId: { type: Schema.Types.ObjectId },

  },
  { timestamps: true }
);

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;
