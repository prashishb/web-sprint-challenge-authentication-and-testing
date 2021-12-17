const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    next({
      status: 401,
      message: 'Token required',
    });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        next({
          status: 401,
          message: 'Token invalid',
        });
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    });
  }
};
