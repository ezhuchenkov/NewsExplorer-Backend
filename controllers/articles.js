const Article = require('../models/article');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-err');
const RequestError = require('../errors/req-err');

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => {
      if (!article) {
        throw new RequestError('Ошибка создания карточки статьи');
      }
      res.send({ data: article });
    })
    .catch(next);
};


module.exports.getAllArticles = (req, res, next) => {
  Article.find({})
    .populate('owner')
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

module.exports.deleteArticleById = (req, res, next) => {
  Article.findById(req.params.id)
  // eslint-disable-next-line consistent-return
    .then((article) => {
      if (!article) return Promise.reject(new NotFoundError('Указанная карточка статьи не найдена'));
      // eslint-disable-next-line no-underscore-dangle
      if (JSON.stringify(article.owner) !== JSON.stringify(req.user._id)) { return Promise.reject(new AuthError('Вы не являетесь автором карточки статьи')); }
      article.remove(article)
        .then((removedarticle) => res.send(removedarticle !== null ? { data: article } : { data: 'Такого объекта не существует' }))
        .catch(next);
    })
    .catch(next);
};
