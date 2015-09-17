/**
 * This is the setup for the database
 */
exports = module.exports = function (
        mongoose,
        config) {
  return {
    connect: function (next) {
      // connect to the database
      mongoose.connect(config.database.uri, config.database.options, function (err) {
        next(err);
      });
    },
    getConnection: function () {
      return mongoose.connection;
    }
  };
};

exports['@singleton'] = true;
exports['@require'] = [
  'mongoose',
  'config'
];


        