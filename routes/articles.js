const articles = require('express').Router();
const { createArticle, getAllArticles, deleteArticleById } = require('../controllers/articles');
const { createArticleValidationSettings, deleteArticleByIdValidationSettings } = require('../settings/requestValidation');

articles.get('/', getAllArticles);
articles.post('/', createArticleValidationSettings, createArticle);
articles.delete('/:id', deleteArticleByIdValidationSettings, deleteArticleById);

module.exports = articles;
