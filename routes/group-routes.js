const express = require('express');
const ensure  = require('connect-ensure-login');
const multer  = require('multer');
const path    = require('path');
const Group   = require('../models/group-model.js');
const User    = require('../models/user-model.js');
const bcrypt      = require('bcrypt');
const passport    = require('passport');
const router      = express.Router();
const myUploader  = multer({ dest: path.join(__dirname, '../public/uploads' ) });

router.get('/groups/new',
  ensure.ensureLoggedIn('/login'),
  (req, res, next) => {
    res.render('groups/new-group-view.ejs');
  }
);

// <form method="post" action="/`group`s">
router.post('/groups',
  ensure.ensureLoggedIn('/login'),
  myUploader.single('groupPic'),
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
      groupView: req.body.groupView,
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


router.get('/groups',
  ensure.ensureLoggedIn(),
  (req, res, next) => {
    Group.find(
      { groupOwner: req.user._id },
      (err, groupsList) => {
        if (err) {
          next(err);
          return;
        }

        res.render('groups/groups-list-view.ejs', {
          groups: groupsList,
          successMessage: req.flash('success')
        });
      }
    );
  }
);


module.exports = router;
