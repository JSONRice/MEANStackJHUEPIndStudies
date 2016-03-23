/* User Mongoose object schema */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Establish ORM Mongoose entities. These are collections with documents mapped to our MongoDB:
// Source: https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
var userSchema = new Schema({
    name: String,
    username: {
        type: String, 
        required: true, 
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
});

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;