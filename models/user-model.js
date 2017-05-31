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
    userPhoto: { type: String },
    // Traditional registration users
    username: { type: String },
    encryptedPassword: { type: String },
    // Login with Facebook users
    facebookID: { type: String },
    // Login with Google users
    googleID: { type: String }
  },
  { timestamps: true }
);

const User     = mongoose.model('User', userSchema);

module.exports = User;
