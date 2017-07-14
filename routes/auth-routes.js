const express     = require('express');
const bcrypt      = require('bcrypt');
const passport    = require('passport');
const ensure = require('connect-ensure-login');

const User        = require('../models/user-model.js');

const authRoutes  = express.Router();

// const myUploader  = multer({ dest: path.join(__dirname, '../public/uploads' ) });
authRoutes.get('/signup',
  ensure.ensureNotLoggedIn('/'),
  (req, res, next) => {
    res.render('auth/signup-view.ejs', {
      errorMessage: req.flash('error')
    });
  }
);


authRoutes.post('/signup',
ensure.ensureNotLoggedIn('/'),
 (req, res, next) => {
  const username = req.body.signupUsername;
  const password = req.body.signupPassword;


  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(username);
  console.log(password);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');


  if (!username || !password) {
    res.status(400).json({ message: 'Provide username and password.' });
    return;
  }

  User.findOne({ username }, '_id', (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong.' });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: 'The username already exists.' });
      return;
    }

    const salt     = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const theUser  = new User({
      username,
      encryptedPassword: hashPass,
    });

    theUser.save((err) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong.' });
        return;
      }

      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong.' });
          return;
        }

        res.status(200).json(req.user);
      });
    });
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log(theUser);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  });
});



authRoutes.get('/login',
  ensure.ensureNotLoggedIn('/'),
  (req, res, next) => {
    res.render('auth/login-view.ejs', {
      errorMessage: req.flash('error')
    });
  }
);

authRoutes.post('/login',
// ensure.ensureNotLoggedIn('/'),
(req, res, next) => {
  const passportFunction = passport.authenticate('local',
  (err, theUser, failureDetails) => {
      if (err) {
        res.status(500).json({ message: 'Something went wrong.' });
        return;
      }

      if (!theUser) {
        res.status(401).json(failureDetails);
        return;
      }

      req.login(theUser, (err) => {
        if (err) {
          res.status(500).json({ message: 'Something went wrong.' });
          return;
        }

        res.status(200).json(req.user);
      });
    }
  );

  passportFunction(req, res, next);
});

authRoutes.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Success.' });
});

authRoutes.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }

  res.status(401).json({ message: 'Unauthorized.' });
});


function gtfoIfNotLogged (req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(403).json({ message: 'FORBIDDEN.' });
    return;
  }

  next();
}

authRoutes.get('/private', gtfoIfNotLogged, (req, res, next) => {
  res.json({ message: 'Todays lucky number is 7677' });
});


module.exports = authRoutes;
