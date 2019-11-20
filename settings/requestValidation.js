const { celebrate, Joi } = require('celebrate');


const signInValidationSettings = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(6).max(38),
    password: Joi.string().required().min(8),
  }),
});

const signUpValidationSettings = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),

});

const createArticleValidationSettings = celebrate({
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

const deleteArticleByIdValidationSettings = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum(),
  }),
});

module.exports = {
  signInValidationSettings,
  signUpValidationSettings,
  createArticleValidationSettings,
  deleteArticleByIdValidationSettings,
};
