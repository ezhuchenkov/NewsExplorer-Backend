const articles = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createArticle, getAllArticles, deleteArticleById } = require('../controllers/articles');

articles.get('/', getAllArticles);
articles.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().min(1).required(),
    title: Joi.string().min(1).required(),
    text: Joi.string().min(1).required(),
    date: Joi.string().min(1).required(),
    source: Joi.string().min(1).required(),
    link: Joi.string().uri().required(),
    image: Joi.string().uri().required(),
  }),
}), createArticle);
articles.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum(),
  }),
}), deleteArticleById);

module.exports = articles;
