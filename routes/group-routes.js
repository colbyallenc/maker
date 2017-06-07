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
    // Group.find(
    //   { groupOwner: req.user._id },
    //   (err, groupsList) => {
    //     if (err) {
    //       next(err);
    //       return;
    //     }
    Group.aggregate([{$sample: {size:6}}],
      (err,foundGroups)=>{
      if (err) {
        next(err);
        return;
        }

       res.render('groups/index.ejs',{
        successMessage:req.flash('success'),
        errorMessage: req.flash('error'),
        groups:foundGroups,
        user: req.user,
        });


        // res.render('groups/index.ejs', {
        //   // user: req.user._id,
        //   groups: groupsList,
        //   successMessage: req.flash('success')
        // });
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



  router.get('/groups/:id/members',  ensure.ensureLoggedIn(), (req, res, next) => {
      var groupID = req.params.id;

    Group.findById(groupID, (err, aGroup) => {
      if(err){
        next(err);
        return;
      } else if (aGroup.members.length > 0) {
        aGroup.members.forEach((oneMember)=>{

            var memberId = oneMember.memberId;

            User.findById(memberId,(err, theMember)=>{
              res.render('groups/group-members-view.ejs', {
                groups: aGroup,
                theMember: theMember
              });
            });
          });
      } else {
        res.render('groups/group-members-view.ejs', {
          groups: aGroup,
        });
      }
    });
  });


  // POST     /groups/id
                          //below make it :groupId
  router.post('/groups/:id/members', ensure.ensureLoggedIn(), (req, res, next) => {
      // const postID = req.params.id; make this a gorup ID
      // const author = req.user;
      const myGroupID = req.params.id;
      const addmember = new Member({
          memberId: req.user._id
      });
  //change everything to group
        Group.findById(
            myGroupID,
                (err, thefeed) => {
                  if (err) {  next(err);
                        return;
                    }
                    thefeed.members.push(addmember);

                    thefeed.save((err) => {
                      if(err) {  next(err);
                    return;
                        }


                    res.redirect(`/groups/${myGroupID}/members`);
            });

        });
    });


      router.get('/groups/:id/tasks',  ensure.ensureLoggedIn(), (req, res, next) => {
          var groupID = req.params.id;

        Group.findById(groupID, (err, aGroup) => {
          if(err){
            next(err);
            return;
          } else if (aGroup.tasks.length > 0) {
            aGroup.tasks.forEach((oneTask)=>{

                var taskId = oneTask.taskId;

                User.findById(taskId,(err, theTask)=>{
                  res.render('groups/new-task-view.ejs', {
                    groups: aGroup,
                    tasks: theTask
                  });
                });
              });
          } else {
            res.render('groups/new-task-view.ejs', {
              groups: aGroup,
            });
          }
        });
      });


      // POST     /groups/id
                              //below make it :groupId
      router.post('/groups/:id/tasks', (req, res, next) => {
          // const postID = req.params.id; make this a gorup ID
          // const author = req.user;
          const myGroupID = req.params.id;

          const addtask = new Task({
              taskId: req.user._id
          });
      //change everything to group
            Group.findById(
                myGroupID,
                    (err, thefeed) => {
                      if (err) {  next(err);
                            return;
                        }
                        thefeed.tasks.push(addtask);

                        thefeed.save((err) => {
                          if(err) {  next(err);
                        return;
                            }


                        res.redirect(`/groups/${myGroupID}/tasks`);
                });

            });
        });


        router.post('groups/:id/tasks/:taskid/delete', (req, res, next) => {
          const taskId = req.params.taskid;

          Task.findByIdAndRemove(taskId, (err, task) => {
            if (err){ return next(err); }
            return res.redirect('/groups/:id/tasks');
          });

        });



        router.get('/groups/:id/jobs', (req, res, next) => {
          var myGroupID = req.params.id;

                Group.findById(
                    myGroupID,
                        (err, foundGroups) => {
                          if (err) {  next(err);
                                return;
                            }

               res.render('groups/jobs.ejs',{
                groups:foundGroups,
                user: req.user,
                });

            });
          });


module.exports = router;
