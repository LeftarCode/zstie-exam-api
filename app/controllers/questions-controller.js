'use strict';
const { validationResult } = require('express-validator/check');
const QuestionsService = require('../services/questions-service');
const GetQuestionListDTO = require('../models/dto/question/dto-get-question-list');
const CreateQuestionDTO = require('../models/dto/question/dto-create-question');
const QuestionsError = require('../constants/errors/questions-errors');
const QuestionSimpleModel = require('../models/response/question/question-simple-model');

class QuestionsController {
    constructor() {
        this.questionsService = new QuestionsService();
    }

    /**
     *
     * @param {*} req - request
     * @param {*} res - response
     * @param {function} next - next
     * @returns {Promise<*>}
     */
    async getQuestionList(req, res, next) {
        if (req.user.role != "ADMIN") {
            res.sendStatus(403);
            next();
            return;
        }

        let validationErrors = validationResult(req.query);
        let getQuestionListDTO = new GetQuestionListDTO(req.query);

        if (!validationErrors.isEmpty()) {
            res.sendError(QuestionsError.CREATE_WRONG_DATA, validationErrors.mapped());
            return next();
        }

        let user = {
            id: req.params.userID
        };
        let existingExam = await DB.Exam.getNotFinishedExamByUserId({
            userId: user.id
        });

        if (existingExam) {
            if (existingExam.dataValues.professionCode !== getQuestionListDTO.professionCode) {
                res.sendError(QuestionsError.ALREADY_EXIST_EXAM_WITH_OTHER_CODE);
                return next();
            }

            let questions = existingExam.Questions.map(question => new QuestionSimpleModel(question));

            res.status(200).json({ questions: questions });
            return next();
        }

        let questions = await this.questionsService.getQuestions(getQuestionListDTO);

        if (!questions.isSuccess) {
            res.sendError(QuestionsError.UNEXPECTED_ERROR);
            return next();
        }
        let questionSimpleModel = questions.data.map(question => new QuestionSimpleModel(question));

        getQuestionListDTO.userId = req.user.id;
        let createdExam = await DB.Exam.createExam(getQuestionListDTO);

        for (let i = 0; i < questionSimpleModel.length; i++) {
            await DB.Answer.createAnswer({
                examId: createdExam.id,
                questionId: questionSimpleModel[i].id,
                answer: -1
            });
        }

        res.status(200).json({ questions: questionSimpleModel });

        next();
    }


    async createQuestion(req, res, next) {

        if (req.user.role != "ADMIN") {
            res.sendStatus(403);
            next();
            return;
        }

        let validationErrors = validationResult(req.body);
        let createQuestionDTO = new CreateQuestionDTO(req.body);

        if (!validationErrors.isEmpty()) {
            res.sendError(QuestionsError.CREATE_WRONG_DATA, validationErrors.mapped());
            return next();
        }

        let question = await DB.Question.createQuestion(createQuestionDTO);

        if (!question) {
            res.sendStatus(500);
            next();
            return;
        }

        res.sendStatus(201);
    }
    /**
     * Register routes for EventsController
     * @param {*} router - express router object
     * @return {undefined} return nothing
     */
    registerRoutes(router) {
        router.get('/questions/:userID', GetQuestionListDTO.validate(), this.getQuestionList.bind(this));
        router.post('/question', CreateQuestionDTO.validate(), this.createQuestion.bind(this));
    }
}

module.exports = QuestionsController;
