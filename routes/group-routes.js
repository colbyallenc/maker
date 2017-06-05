const express = require('express');
const ensure  = require('connect-ensure-login');
const multer  = require('multer');
const path    = require('path');
const Group   = require('../models/group-model.js');
const User    = require('../models/user-model.js');
const Post    = require('../models/post-model.js');
const Task   = require('../models/task-model.js');
const Comment     = require('../models/comment-model.js');
const bcrypt      = require('bcrypt');
const passport    = require('passport');
const router      = express.Router();
const myUploader  = multer({ dest: path.join(__dirname, '../public/uploads' ) });

// GET new-group
router.get('/groups/new', ensure.ensureLoggedIn('/login'), (req, res, next) => {
    res.render('groups/new-group-view.ejs');
  }
);

// <form method="post" action="/`group`s">
router.post('/groups',
  ensure.ensureLoggedIn('/login'),
  myUploader.single('groupPhoto'),
  (req, res, next) => {
    console.log('');
    console.log('req.file ~~~~~~~~~~~~~~~~~~~~~~');
    console.log(req.file);
    console.log('');
    const theGroup = new Group({
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


// GET   /groups
router.get('/groups', ensure.ensureLoggedIn(), (req, res, next) => {
    Group.find(
      { groupOwner: req.user._id },
      (err, groupsList) => {
        if (err) {
          next(err);
          return;
        }
        res.render('groups/index.ejs', {
          // user: req.user._id,
          groups: groupsList,
          successMessage: req.flash('success')
        });
      }
    );
  }
);

// GET     /groups/id
router.get('/groups/:id',  ensure.ensureLoggedIn(), (req, res, next) => {
    var groupID = req.params.id;
  Group.findById(groupID, (err, aGroup) => {
    if(err){
      next(err);
      return;

    } else if (aGroup.posts.length > 0) {
      aGroup.posts.forEach((onePost)=>{
          var post = onePost.content;
          var authorId = onePost.authorId;
          User.findById(authorId,(err, theAuthor)=>{
            res.render('groups/group-index.ejs', {
              groups: aGroup,
              posts: post,
              theAuthor: theAuthor
            });
          });
        });
    } else {
      res.render('groups/group-index.ejs', {
        groups: aGroup,
      });
    }
  });

});


// POST     /groups/id
                        //below make it :groupId
router.post('/groups/:id/post', ensure.ensureLoggedIn(), (req, res, next) => {
    // const postID = req.params.id; make this a gorup ID
    // const author = req.user;
    const myGroupID = req.params.id;
    const addcomment = new Post({
        content: req.body.postComment,
        authorId: req.user._id

    });

    console.log(req.body.postComment);

//change everything to group
      Group.findById(
          myGroupID,
              (err, thefeed) => {  if (err) {  next(err);
                      return;
                  }
                  thefeed.posts.push(addcomment);
                  thefeed.save((err) => {  if(err) {  next(err);
                          return;
                      }
                  res.redirect(`/groups/${myGroupID}`);
          });
      });
  });


module.exports = router;
