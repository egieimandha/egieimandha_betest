const passport = require('passport');
const httpStatus = require('http-status');

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  // console.log(user);
  if (err || info || !user) {
    return reject(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
  req.user = user;

  resolve();
};

const auth = () => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    try {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject))(req, res, next);
    } catch (error) {
      // console.log(error);
    }
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
