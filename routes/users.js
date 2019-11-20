const users = require('express').Router();
const { getUserInformation } = require('../controllers/users');


users.get('/me', getUserInformation);

module.exports = users;
