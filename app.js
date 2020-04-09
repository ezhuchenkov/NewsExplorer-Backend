require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const { signInValidationSettings, signUpValidationSettings } = require('./settings/requestValidation');
const { limiter, createAccountLimiter, singinLimiter } = require('./settings/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { createUser, login, logout } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT, MONGODB } = process.env;
const app = express();
app.use(cors(({
  credentials: true,
  origin: true,
})));
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger);

app.post('/signin', singinLimiter, signInValidationSettings, login);
app.post('/signup', createAccountLimiter, signUpValidationSettings, createUser);
app.post('/logout', logout);
app.use(auth);
app.use('/', router);
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
