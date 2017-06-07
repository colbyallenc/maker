const express = require('express');
const ensure  = require('connect-ensure-login');
const multer  = require('multer');
const path    = require('path');
const Group   = require('../models/group-model.js');
const Member  = require('../models/member-model.js');
const User    = require('../models/user-model.js');
const Post    = require('../models/post-model.js');
const Task    = require('../models/task-model.js');
const Comment     = require('../models/comment-model.js');
const bcrypt      = require('bcrypt');
const passport    = require('passport');
const router      = express.Router();
const myUploader  = multer({ dest: path.join(__dirname, '../public/uploads' ) });


router.post('/jobs',
  ensure.ensureLoggedIn('/login'),
  myUploader.single('jobPhoto'),
  (req, res, next) => {
    console.log('');
    console.log('req.file ~~~~~~~~~~~~~~~~~~~~~~');
    console.log(req.file);
    console.log('');
    const theJob = new Group({
      groupTitle: req.body.groupTitle,
      content: req.body.content,
      groupPhoto: `/uploads/${req.file.filename}`,
      groupOwner: req.user._id,
      groupDemand: req.body.groupDemand,
      groupView: req.body.groupView
    });
    theGroup.save((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/groups');
    });
  }
);
