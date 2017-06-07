const mongoose   = require('mongoose');
const Schema     = mongoose.Schema;

const userSchema = new Schema(
  {  // All users
    name: { type: String },
    role: {
      type: String,
      enum: [ 'normal user', 'admin' ],
      default: 'normal user'
      },
    jobType: String,
    userPhoto: { type: String },
    about: {type: String},
    skills: [ String ] ,
    // Traditional registration users
    username: { type: String },
    encryptedPassword: { type: String },
    // Login with Facebook users
    facebookID: { type: String },
    // Login with Google users
    googleID: { type: String },
    posts: [ { type: Schema.Types.ObjectId, ref: 'Post' } ],
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    members: [{type: Schema.Types.ObjectId, ref: 'Member'}]
  },
  { timestamps: true }
);

const User     = mongoose.model('User', userSchema);

module.exports = User;
