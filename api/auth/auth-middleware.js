const Users = require('../users/users-model');
const bcrypt = require('bcryptjs');
const tokenBuilder = require('./token-builder');

// Check for empty fields
const validateEmptyFields = (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    next({
      status: 400,
      message: 'username and password required',
    });
  } else {
    next();
  }
};

// Check if username already exists
const validateUsername = async (req, res, next) => {
  try {
    const user = await Users.findByUsername(req.body.username);
    if (user) {
      next({
        status: 401,
        message: 'username taken',
      });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

const hashPassword = (req, res, next) => {
  const { username, password } = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(password, rounds);

  req.body = {
    username,
    password: hash,
  };
  next();
};

// Validations on Login
const validateLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await Users.findByUsername(username);
  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = tokenBuilder(user);
      req.token = token;
      next();
    } else {
      next({
        status: 401,
        message: 'invalid credentials',
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validateEmptyFields,
  validateUsername,
  hashPassword,
  validateLogin,
};
