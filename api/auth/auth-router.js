const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const {
  validateEmptyFields,
  validateUsername,
  validateLogin,
} = require('./auth-middleware');

router.post(
  '/register',
  validateEmptyFields,
  validateUsername,
  (req, res, next) => {
    const { username, password } = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(password, rounds);

    Users.add({ username, password: hash })
      .then((user) => {
        res.status(201).json(user);
        console.log(req.body);
      })
      .catch(next);
  }
);

router.post('/login', (req, res, next) => {
  res.end('implement login, please!');
  /*
    IMPLEMENT
    You are welcome to build additional middlewares to help with the endpoint's functionality.

    1- In order to log into an existing account the client must provide `username` and `password`:
      {
        "username": "Captain Marvel",
        "password": "foobar"
      }

    2- On SUCCESSFUL login,
      the response body should have `message` and `token`:
      {
        "message": "welcome, Captain Marvel",
        "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
      }

    3- On FAILED login due to `username` or `password` missing from the request body,
      the response body should include a string exactly as follows: "username and password required".

    4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
      the response body should include a string exactly as follows: "invalid credentials".
  */
});

module.exports = router;
