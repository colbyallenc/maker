const mongoose = require('mongoose');
const User     = require('./user-model.js');
const Schema   = mongoose.Schema;
const Comment = require('./comment-model.js');

const groupSchema = Schema({
    groupTitle: String,
    content: String,
    groupOwner: { type: Schema.Types.ObjectId },
    groupPhoto: String,
    groupDemand: String,
    groupView: String,

    comments: [ {
    content: String,
    authorId: { type: Schema.Types.ObjectId },
    imagePath: String
    } ]
});


const Group = mongoose.model('Group', groupSchema);


module.exports = Group;
