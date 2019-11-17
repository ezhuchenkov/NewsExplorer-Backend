require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const usersRoute = require('./routes/users');
const articlesRoute = require('./routes/articles');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { signin, signup } = require('./settings/celebrate');
const { limiter, createAccountLimiter, singinLimiter } = require('./settings/rateLimiter');

const { PORT = 3000, MONGODB = 'mongodb://localhost:27017/articles' } = process.env;

const app = express();
app.use(helmet());
app.use(limiter());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use(requestLogger);

app.post('/signin', singinLimiter, signin, login);
app.post('/signup', createAccountLimiter, signup, createUser);
app.use(auth);
app.use('/users', usersRoute);
app.use('/articles', articlesRoute);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Page not found' });
});

app.use(errorLogger);
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});
app.listen(PORT, () => {
  console.log('App is listening to port ', PORT);
});
