// User database model entity that represents a Mongo collection
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var user = new schema({
  // OPTIONAL-TODO: ensure username is an email address
  username: {
    type: String,
    required: true,
    unique: true
  },
  firstname: {
    type: String,
    default: ""
  },
  lastname: {
    type: String,
    default: ""
  },
  // Notice: do not make password required or unique. Let the UI ensure that
  // a password is provided. For some odd reason making this required is causing
  // a server side exception. See api.js for test curl command.
  password: String,
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', user);