'use strict';
const {validationResult} = require('express-validator/check');
const SendExamDTO = require('../models/dto/exam/dto-send-exam');
const GetExamDTO = require('../models/dto/exam/dto-get-exam');
const ExamErrors = require('../constants/errors/exams-errors');
const ExamService = require('../services/exam-service');
const ExamSubmitModel = require('../models/response/exam/exam-submit-model');
const ExamSimpleModel = require('../models/response/exam/exam-simple-model');
const QualificationSimpleModel = require('../models/response/qualification/qualification-simple-model');
const ExamUltraSimpleModel = require('../models/response/exam/exam-ultra-simple-model');

class ExamController {

  constructor() {
    this.examService = new ExamService();
  }

  async updateExam(req, res, next) {
    console.log(req.body);
    let validationErrors = validationResult(req.body);
    let sendExamDTO = new SendExamDTO(req.body);

    sendExamDTO.userId = req.user.id;

    if (!validationErrors.isEmpty()) {
      res.sendError(ExamErrors.CREATE_WRONG_DATA);
      return next();
    }

    let currentExam = await this.examService.getNotFinishedExamByUserId(sendExamDTO);

    if (!currentExam.data) {
      res.sendError(ExamErrors.EXAM_NOT_FOUND);
      return next();
    }

    if (!currentExam.isSuccess) {
      res.sendError(currentExam.error);
      return next();
    }

    await this.examService.finishExamById(currentExam.data.id);

    let examSimpleModel = new ExamSubmitModel(currentExam.data);

    for (let i = 0; i < sendExamDTO.questionsId.length; i++) {
      DB.Answer.updateAnswer({
        examId: currentExam.data.id,
        questionId: sendExamDTO.questionsId[i],
        answer: sendExamDTO.answersIndices[i]
      });
    }

    let questions = await DB.Exam.getExamQuestions(currentExam.data.id);
    let answers = await DB.Answer.getAnswersByExamId(currentExam.data.id);

    let score = 0;
    let answersCorrectness = [];

    for (let i = 0; i < questions.dataValues.Questions.length; i++) {
      for (let j = 0; j < answers.length; j++) {
        let currentQuestion = questions.dataValues.Questions[i].dataValues;
        let currentAnswer = answers[j].dataValues;

        if (currentQuestion.id === currentAnswer.questionId) {
          if (currentQuestion.correctAnswerIndex === currentAnswer.answer) {
            score++;
            answersCorrectness.push(true);
          } else {
            answersCorrectness.push(false);
          }
        }
      }
    }

    res.status(200).json({
      id: currentExam.data.id,
      score: score,
      answersCorrectness: answersCorrectness
    });
  }

  async getExamById(req, res, next) {
    let validationErrors = validationResult(req.params);
    let getExamDTO = new GetExamDTO(req.params);

    if (!validationErrors.isEmpty()) {
      res.sendError(ExamErrors.CREATE_WRONG_DATA);
      return next();
    }

    let exam = await this.examService.getExamById(getExamDTO);

    if (!exam.isSuccess) {
      res.sendError(exam.error);
      return next();
    }

    let examSimpleModel = new ExamSimpleModel(exam.data);

    res.status(200).json(examSimpleModel);
    next();
  }

  async getUserExam(req, res, next) {
    let user = req.user;

    let exams = await DB.Exam.getUserExamById(user.id);

    let response = [];

    for (let i = 0; i < exams.length; i++) {
      let qualification = await DB.Qualification.getQualificationByCode(exams[i].professionCode);

      let answers = await DB.Answer.getAnswersByExamId(exams[i].id);
      let questions = exams[i].Questions;
      let score = 0;

      for (let j = 0; j < questions.length; j++) {
        for (let k = 0; k < answers.length; k++) {
          let currentQuestion = questions[j].dataValues;
          let currentAnswer = answers[k].dataValues;

          if (currentQuestion.id === currentAnswer.questionId) {
            if (currentQuestion.correctAnswerIndex === currentAnswer.answer) {
              score++;
            }
          }
        }
      }

      response.push({
        exam: new ExamUltraSimpleModel( exams[i] ),
        qualification: new QualificationSimpleModel(qualification),
        score: score,
        maxScore: questions.length
      });
    }

    res.status(200).json(response);
    next();
  }

  async getActiveExamInList(req, res, next) {
      let user = req.user;

      let exam = await this.examService.getActiveExamList(user.id);

      if (!exam.isSuccess) {
          res.sendError(exam.error);
          return next();
      }

      let response = new QualificationSimpleModel(exam.data);

      res.status(200).json([response]);
      next();
  }

  registerRoutes(router) {
    router.get('/exams', GetExamDTO.validate(), this.getActiveExamInList.bind(this));
    router.put('/exam', SendExamDTO.validate(), this.updateExam.bind(this));
    router.get('/exam/:id', GetExamDTO.validate(), this.getExamById.bind(this));
    router.get('/user/my/exam', GetExamDTO.validate(), this.getUserExam.bind(this));
  }
}

module.exports = ExamController;
