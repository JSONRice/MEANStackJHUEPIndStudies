exports = module.exports = function(express) {
  return express.Router();
};

exports['@singleton'] = true;
exports['@require'] = ['express'];
