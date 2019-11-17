const { celebrate, Joi } = require('celebrate');

const articleCreate = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(1).required(),
    title: Joi.string().min(1).required(),
    text: Joi.string().min(1).required(),
    date: Joi.string().min(1).required(),
    source: Joi.string().min(1).required(),
    link: Joi.string().uri().required(),
    image: Joi.string().uri().required(),
  }),
});

const articleDelete = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum(),
  }),
});

const signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signup = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),

});

module.export = {
  articleCreate, articleDelete, signin, signup,
};
