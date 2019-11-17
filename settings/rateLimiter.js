const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    'Too many accounts created from this IP, please try again after an hour',
});

const singinLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 10, // start blocking after 5 requests
  message:
    'Too many login attempts from this IP, please try again after an hour',
});

module.export = { limiter, createAccountLimiter, singinLimiter };
