# NewsExplorer-Backend

Сервер доступен по адресу [https://api.notbadnews.tk] ![Йожик](https://github.com/ezhuchenkov/ezhuchenkov.github.io/blob/master/%D0%81%D0%B6.svg)


* команда npm run start запускает сервер;
* команда npm run dev запускает сервер с хот релоудом;
* обновлены правила в файле eslintrc.js. Добавлены исключения для идентификаторов с нижним подчёркиванием;
* Node.js приложение подключается к серверу Mongo по адресу mongodb://localhost:27017/articles;
* создана схема и модель пользователя с полями name, email и password, поля корректно валидируются;
* создана схема и модель карточки новости с полями keyword, title, text, date, source, link, image и owner, поля корректно валидируются;
*	Созданы контроллеры и роуты для пользователей и карточек новостей
* установлен пакет validator, в схеме пользователя добавлены обязательные email и password, поле email уникально и валидируется;
* в контроллере createUser почта и хеш пароля записываются в базу, установлен модуль bcryptjs;
* если почта и пароль верные, контроллер login создаёт JWT, в пейлоуд которого записано свойство _id с идентификатором пользователя; срок жизни токена — 7 дней;
* если почта и пароль верные, контроллер login возвращает созданный токен в ответе;
* если почта и пароль не верные, контроллер login возвращает ошибку 401;
* в app.js есть обработчики POST-запросов на роуты /signin и /signup;
* есть файл middlewares/auth.js, в нём мидлвэр для проверки JWT;
* при правильном JWT авторизационный мидлвэр добавляет в объект запроса пейлоуд и пропускает запрос дальше;
* при неправильном JWT авторизационный мидвэр возвращает ошибку 401;
* все роуты, кроме /signin и /signup, защищены авторизацией;
* пользователь не может удалить карточку, которую он не создавал;
* API не возвращает хеш пароля;
* Реализована централизованная обработка ошибок;
* Реализована валидация запросов с помощью Joi и celebrate;
* Реализовано логгирование запросов и ошибок
* Создан облачный сервер и развернуто API
* Создан домен api.notbadnews.tk и прикреплен к серверу
* Выпущены SSL-сертификаты
* Создан на сервере .env файл и добавлены переменные окружения

