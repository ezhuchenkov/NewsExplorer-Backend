/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RequestError = require('../errors/req-err');
const AuthError = require('../errors/auth-err');
const NotFoundError = require('../errors/not-found-err');
const { requestErrorMessage, notFoundErrorMessage, authErrorMessage } = require('../settings/messages');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      if (!user) {
        throw new RequestError(requestErrorMessage);
      }
      return res.status(201).send({
        _id: user._id, name: user.name, email: user.email,
      });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthError(authErrorMessage);
      }
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .status(201)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        }).send({ message: `Добро пожаловать,${user.name}!`, jwt: token });
    })
    .catch(next);
};

const getUserInformation = (req, res, next) => {
  // eslint-disable-next-line max-len
  // предполагается, что пользователь в запросе не передаёт свой id, поэтому id вычисляется по cookies
  const payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

  User.findById(payload._id)
    .then((user) => {
      if (!user) throw Error;
      res.send({ user: user.name, email: user.email });
    })
    .catch(() => next(new NotFoundError(notFoundErrorMessage)));
};

module.exports = { createUser, login, getUserInformation };
