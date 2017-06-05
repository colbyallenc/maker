const express     = require('express');
const bcrypt      = require('bcrypt');
const passport    = require('passport');
const multer      = require('multer');
const path        = require('path');
const User        = require('../models/user-model.js');
const Group       = require('../models/group-model.js');
const router      = express.Router();
const myUploader  = multer({ dest: path.join(__dirname, '../public/uploads' ) });

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log('HOME ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log('SESSION (from express-session middleware)');
  console.log(req.session);
  console.log('\n');
  console.log('USER (from Passport middleware)');
  console.log(req.user);
console.log("GROUPS~~~~~~~~~~");
  

  // Render a completely different view for logged in users
  // if (req.user) {
  //   res.render('logged-in-home.ejs');
  // } else {
  //   res.render('index');
  // }
  Group.find(
    { groupOwner: req.user._id },
    (err, groupsList) => {
      if (err) {
        next(err);
        return;
      }
      res.render('index.ejs', {
        user: req.user,
        groups: groupsList,
        successMessage: req.flash('success')
      });

  // res.render('index', {
  //   successMessage: req.flash('success'),
  //   user: req.user,
  // });
  // console.log(groups);
});
});

// ____________________________________________________
//
// router.get('/', (req, res, next) => {
//   res.render('index', {
//   title: 'm a k e r .',
//   user : req.user
// });
// });
//
//
// router.get('/projects', (req, res, next) => {
//   res.render('', {
//   user : req.user
// });
//
// console.log(user.userPhoto);
// });



module.exports = router;
