const errorCodes = require('./error-codes.js');

function errorHandler(err, req, res, next) {
  const code = (err && err.code) || null;
  const error = errorCodes[code] || errorCodes['INTERNAL_ERROR'];

  return res
    .status(error.statusCode)
    .json({ message: error.message });
};

module.exports = errorHandler;