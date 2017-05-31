const express     = require('express');
const bcrypt      = require('bcrypt');
const passport    = require('passport');
const multer      = require('multer');
const path        = require('path');
const ensure      = require('connect-ensure-login');
const User        = require('../models/user-model.js');
const authRoutes  = express.Router();

const myUploader  = multer({ dest: path.join(__dirname, '../public/uploads' ) });

//
// authRoutes.get('/signup',
//     //        redirects to '/' (home page) if you ARE logged in
//     //                      |
//   ensure.ensureNotLoggedIn('/'),
//
//   (req, res, next) => {
//     // If not for 'ensureNotLoggedIn()' we would have to do this:
//
//     // if (req.user) {
//     //   res.redirect('/');
//     //   return;
//     // }
//
//     res.render('auth/signup-view.ejs');
//   }
// );


// <form method="post" action="/signup">
authRoutes.post('/signup',
  ensure.ensureNotLoggedIn('/'),
  myUploader.single('userPhoto'),
  (req, res, next) => {
    const signupUsername = req.body.signupUsername;
    const signupPassword = req.body.signupPassword;

    // Don't let users submit blank usernames or passwords
    // if (signupUsername === '' || signupPassword === '') {
    //   res.render('auth/signup-view.ejs', {
    //     errorMessage: 'Please provide both username and password.'
    //   });
    //   return;
    // }

    // Check password length, characters, etc. (we are ignoring that here)

    User.findOne(
      // 1st arg -> criteria of the findOne (which documents)
      { username: signupUsername },
      // 2nd arg -> projection (which fields)
      { username: 1 },
      // 3rd arg -> callback
      (err, foundUser) => {
        if (err) {
          next(err);
          return;
        }

        // Don't let the user register if the username is taken
        // if (foundUser) {
        //   res.render('auth/signup-view.ejs', {
        //     errorMessage: 'Username is taken, sir or madam.'
        //   });
        //   return;
        // }

        // We are good to go, time to save the user.

        // Encrypt the password
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(signupPassword, salt);

        // Create the user
        const theUser = new User({
          name: req.body.signupName,
          username: signupUsername,
          encryptedPassword: hashPass,
          userPhoto: `/uploads/${req.file.filename}`,
        });

        // Save it
        theUser.save((err) => {
          if (err) {
            next(err);
            return;
          }

          // Store a message in the box to display after the redirect
          req.flash(
            'success',
            'You have registered successfully!'
          );
          res.redirect('/');
        });
      }
    );
  }
);

// authRoutes.get('/login',
//     //        redirects to '/' (home page) if you ARE logged in
//     //                      |
//   ensure.ensureNotLoggedIn('/'),
//
//   (req, res, next) => {
//     // If not for 'ensureNotLoggedIn()' we would have to do this:
//
//     // if (req.user) {
//     //   res.redirect('/');
//     //   return;
//     // }
//
//     res.render('auth/login-view.ejs', {
//       errorMessage: req.flash('error')
//         //                       |
//     }); //    default name for error messages in Passport
//   }
// );

// <form method="post" action="/login">
authRoutes.post('/login',
  ensure.ensureNotLoggedIn('/'),
  passport.authenticate('local', {
    successRedirect: '/',
    successFlash: true,        // req.flash('success')
    failureRedirect: '/login',
    failureFlash: true         // req.flash('error')
  } )
);

authRoutes.get('/logout', (req, res, next) => {
  req.logout();
  req.flash('success', 'You have logged out successfully. 🤠');
  res.redirect('/');
});

authRoutes.get('/auth/facebook', passport.authenticate('facebook'));

authRoutes.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

authRoutes.get('/auth/google', passport.authenticate('google', {
  scope: [ "https://www.googleapis.com/auth/plus.login",
           "https://www.googleapis.com/auth/plus.profile.emails.read" ]
}));

authRoutes.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));


module.exports = authRoutes;
