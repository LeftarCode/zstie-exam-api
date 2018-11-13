'use strict';
const ExamQuestionSimpleModel = require('./exam-question-simple-model');

class ExamSimpleModel {

  /**
   * @param {String} model.id - exam id
   * @param {String} model.userCode - exam user code
   * @param {String} model.score - exam score
   * @param {String} model.maxScore - exam max score
   * @param {*} model.Questions - exam questions
   * @param {*} model - model
   */
  constructor(model) {
    if (model) {
      this.id = model.id;
      this.userCode = model.userCode;
      this.score = model.score;
      this.maxScore = model.maxScore;
      this.questions = model.Questions.map(question => new ExamQuestionSimpleModel(question));
    }
  }
}

module.exports = ExamSimpleModel;
