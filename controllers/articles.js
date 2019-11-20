const jwt = require('jsonwebtoken');

const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-err');
const RequestError = require('../errors/req-err');
const { requestErrorMessage, notFoundErrorMessage, authErrorErrorMessage } = require('../settings/messages');

const { NODE_ENV, JWT_SECRET } = process.env;


const createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      if (!article) { throw new RequestError(requestErrorMessage); }
      res.send(article);
    })
    .catch(next);
};
const getAllArticles = (req, res, next) => {
  Article.find({})
    .populate('owner')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const deleteArticleById = (req, res, next) => {
  // eslint-disable-next-line max-len
  // предполагается, что пользователь в запросе не передаёт свой id, поэтому id вычисляется по cookies
  const user = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')._id;
  Article.findById(req.params.id)
  // eslint-disable-next-line consistent-return
    .then((article) => {
      if (!article) return Promise.reject(new NotFoundError(notFoundErrorMessage));
      // eslint-disable-next-line no-underscore-dangle
      // eslint-disable-next-line max-len
      if (JSON.stringify(article.owner._id) !== JSON.stringify(user)) { return Promise.reject(new AuthError(authErrorErrorMessage)); }
      article.remove(article)
        .then((removedarticle) => res.send(removedarticle !== null ? { data: article } : { data: 'Такого объекта не существует' }))
        .catch(next);
    })
    .catch(next);
};

module.exports = { createArticle, getAllArticles, deleteArticleById };
