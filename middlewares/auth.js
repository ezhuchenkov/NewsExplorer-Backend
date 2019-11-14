/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-err');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new AuthError('Необходима авторизация');
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthError('Необходима авторизация');
  }
  req.user = payload._id;
  next();
};
