'use strict';

class ExamSubmitModel{

  /**
   *
   * @param {*} model - exam model
   * @param {Array<Boolean>} model.answersCorrectness - answers correctness
   * @param {Number} model.score - exam score
   */
  constructor(model){
    this.answersCorrectness = model.answersCorrectness;
    this.score = model.score;
  }
}

module.exports = ExamSubmitModel;
