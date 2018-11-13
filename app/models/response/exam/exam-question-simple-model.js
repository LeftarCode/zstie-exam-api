'use strict';

class ExamQuestionSimpleModel {

  /**
   * @param {String} model.imageUrl - question image url
   * @param {String} model.correctAnswerIndex - question correct answer
   * @param {String} model.content - question content
   * @param {String} model.answers - question answers
   * @param {*} model.Answer - exam answer
   * @param {*} model.Answer.answer - question answer
   * @param {*} model - model
   */
  constructor(model) {
    this.id = model.id;
    this.imageUrl = model.imageUrl;
    this.correctAnswerIndex = model.correctAnswerIndex;
    this.content = model.content;
    this.answers = model.answers;
    this.selectedAnswer = model.Answer.answer;
  }
}

module.exports = ExamQuestionSimpleModel;
