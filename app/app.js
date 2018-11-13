'use strict';
const Express = require('express');
const BodyParser = require('body-parser');
const Lusca = require('lusca');
const Cors = require('cors');

const ExpressUtilities = require('./utilities/express');

const QuestionsController = require('./controllers/questions-controller');
const ExamController = require('./controllers/exam-controller');
const UserController = require('./controllers/user-controller');
const QualificationController = require('./controllers/qualification-controller');

const AuthorizationMiddleware = require('./middlewares/authorization');

let router = Express.Router();

const app = Express();

app.use(ExpressUtilities);
app.use(Cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.use(Lusca.xframe('SAMEORIGIN'));
app.use(Lusca.xssProtection(true));
app.use(Lusca.xssProtection(true));
app.use(AuthorizationMiddleware.authorizationHandler);

let questionController = new QuestionsController();
let examController = new ExamController();
let userController = new UserController();
let qualificationController = new QualificationController();

questionController.registerRoutes(router);
examController.registerRoutes(router);
userController.registerRoutes(router);
qualificationController.registerRoutes(router);

app.use(router);

module.exports = app;