// User database model entity that represents a Mongo collection
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');


var User = new Schema({
  // Note the email address is the username
  username: String,
  firstName: String,
  lastName: String,
  password: String,
  age: Number,
  gender : { type: String, enum: ['Male', 'Female'] }, 
  registrationDate: { type: Date, default: Date.now },
  isAdmin: Boolean
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);