const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User     = require('./user-model.js');
const Task = require('./task-model.js');
const Post = require('./post-model.js');
const Member = require('./member-model.js');

const groupSchema = new Schema({
    groupTitle: String,
    groupOwner: { type: Schema.Types.ObjectId },
    groupPhoto: String,
    groupTask: [{
      content: String,
      authorId: { type: Schema.Types.ObjectId },
    }],
    content: String,
    groupView: String,
    members: [ Member.schema ],
    posts: [ Post.schema ],
    tasks: [Task.schema]

    // posts: [ { type: Schema.Types.ObjectId, ref: 'Post' } ]
    // user: [ User.schema ]

});


const Group = mongoose.model('Group', groupSchema);


module.exports = Group;
