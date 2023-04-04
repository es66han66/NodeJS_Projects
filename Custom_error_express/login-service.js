const CustomError = require('./custom-error');

function loginService(data) {
  const { email, password } = data;
  const token = 'access_token';

  if (!email || !password) {
    throw new CustomError('INVALID_EMAIL_OR_PASSWORD');
  }

  if (email !== 'user@test.com' || password !== 'helloworld') {
    throw new CustomError('USER_NOT_FOUND');
  }

  return token;
}

module.exports = loginService;