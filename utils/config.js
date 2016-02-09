/***
 * Configurations loader service
 */
exports = module.exports = function() {
  var config;
  switch (process.env.NODE_ENV || 'development') {
      // Add additional files when needed
      /*
    case 'production':
      config = require('../config/production');
      break;
    case 'testing':
      config = require('../config/testing');
      break;
    case 'staging':
      config = require('../config/staging');
      break;
      */
    case 'development':
    default:      
      config = require('../config/development');
      break;
  }
  return config;
};

exports['@singleton'] = true;
exports['@require'] = [];