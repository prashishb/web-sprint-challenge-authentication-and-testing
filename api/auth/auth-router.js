const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const {
  validateEmptyFields,
  validateUsername,
  hashPassword,
  validateLogin,
} = require('./auth-middleware');

router.post(
  '/register',
  validateEmptyFields,
  validateUsername,
  hashPassword,
  (req, res, next) => {
    Users.add(req.body)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch(next);
  }
);

router.post('/login', validateEmptyFields, validateLogin, (req, res, next) => {
  res.status(200).json({
    message: `Welcome ${req.body.username}!`,
    token: req.token,
  });
  next();
});

module.exports = router;
