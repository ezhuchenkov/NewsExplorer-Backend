const articles = require('express').Router();
const { articleCreate, articleDelete } = require('../celebrate/celebrate');
const { createArticle, getAllArticles, deleteArticleById } = require('../controllers/articles');

articles.get('/', getAllArticles);
articles.post('/', articleCreate, createArticle);
articles.delete('/:id', articleDelete, deleteArticleById);

module.exports = articles;
