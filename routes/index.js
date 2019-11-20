const express = require('express');
const usersRoute = require('../routes/users');
const articlesRoute = require('../routes/articles');
const NotFoundError = require('../errors/not-found-err');
const { notFoundErrorMessage } = require('../settings/messages');

const router = express();

router.use('/users', usersRoute);
router.use('/articles', articlesRoute);
router.use('*', () => {
  throw new NotFoundError(notFoundErrorMessage);
});

module.exports = router;
