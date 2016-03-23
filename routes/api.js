// Controller (API) Route File

var ioc = require('electrolyte');
var router = ioc.create('router');
var passport = require('passport');
var user = require('../models/user.js');
var version = require('../models/version.js');

// To test route run: 
// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"username": "test@test.com", "password": "test"}' http://localhost:8000/api/register
// Note if test fails ensure port is the startup port from the NodeJS config file (app.js)
router.post('/register', function (req, res) {
  user.register(new user({username: req.body.username}), req.body.password, function (err, account) {
    if (err) {
      return res.status(500).json({err: err});
    }
    passport.authenticate('local')(req, res, function () {
      return res.status(200).json({status: 'Registration successful!'});
    });
  });
});

// To test route:
// curl -H "Accept: application/json" -H "Content-type: application/json" -X POST -d '{"username": "test@test.com", "password": "test"}' http://localhost:8000/api/login
// Note if test fails ensure port is the startup port from the NodeJS config file (app.js)
router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    else if (!user) {
      return res.status(401).json({err: info});
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({status: 'Login successful!'});
    });
  })(req, res, next);
});

// To test route:
// curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://localhost:8000/api/logout
// Note if test fails ensure port is the startup port from the NodeJS config file (app.js)
router.get('/logout', function (req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
});

////
// Retrieve users from the Mongo user collection
// To test on command line:
// curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://localhost:8000/api/users
//
// To test in browser:
// http://localhost:8000/api/users
////
router.get('/users', function (req, res) {
  user.find(function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

////
// Retrieve a single user (doc) from the Mongo user collection
// To test on command line:
// curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://localhost:8000/api/findUser/test@test.com
//
// To test in browser:
// http://localhost:8000/api/findUser/test@test.com
////
router.get('/findUser/:username', function (req, res) {
  user.findOne({username: req.params.username}, function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

////
// Retrieve versions from the Mongo user collection
// To test on command line:
// curl -H "Accept: application/json" -H "Content-type: application/json" -X GET http://localhost:8000/api/versions
//
// To test in browser:
// http://localhost:8000/api/users
////
router.get('/versions', function (req, res) {
  version.find(function (err, user) {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
});

module.exports = router;
