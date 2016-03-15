// Version database model entity that represents a Mongo collection
// Used to track versioning information associated with the project (MEAN stack web apps):
var mongoose = require('mongoose');
var schema = mongoose.Schema;

var version = new schema({
  authors: {
    // one or more authors that have contributed or are actively contributing
    type: [String],
    required: true,
    unique: false
  },
  // this is a glorified mission statement
  background: {
    type: String,
    required: true,
    unique: false
  },
  githubInfo: {
    url: {
      type: String,
      required: true,
      unique: false
    },
    title: {
      type: String,
      required: true,
      unique: false
    }
  },
  versionID: {
    type: String,
    required: true,
    default: "0.0.1",
    unique: true,
    dropDubs: true
  }
});

module.exports = mongoose.model('versions', version);