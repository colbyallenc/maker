const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobsSchema = new Schema({
groupName:{type:String},
jobOpen:{type:String},

},{
  timestamps: true
});

const Job = mongoose.model('Job', jobsSchema);

module.exports = Job;
