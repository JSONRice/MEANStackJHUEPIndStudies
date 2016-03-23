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
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  // UI is responsible for ensuring that there's a valid password. This is left off
  // so that passport-local-mongoose can hide the password as a hash in the document per user.
  password: String,
  registrationDate: {
    type: Date,
    default: Date.now
  }
});

user.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', user);