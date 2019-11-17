const users = require('express').Router();
const { getUserById } = require('../controllers/users');


users.get('/me', getUserById);

module.exports = users;
