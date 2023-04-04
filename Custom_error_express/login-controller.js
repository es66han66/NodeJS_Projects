const loginService = require('./login-service.js');

function loginController(req, res, next) {
  try {
    const token = loginService(req.body);
    res.json({ token });
  } catch(error) {
    next(error);
  }
}

module.exports = loginController;