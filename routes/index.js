const express     = require('express');
const bcrypt      = require('bcrypt');
const passport    = require('passport');
const multer      = require('multer');
const path        = require('path');
const User        = require('../models/user-model.js');
const router      = express.Router();
const myUploader  = multer({ dest: path.join(__dirname, '../public/uploads' ) });

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
     // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

module.exports = router;
