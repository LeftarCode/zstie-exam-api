'use strict';

class ExamUltraSimpleModel {

  /**
   * @param {String} model.id - exam id
   * @param {String} model.startTime - exam start time
   * @param {String} model.finishTime - exam finish time
   * @param {String} model.isFinished - exam is finished
   * @param {*} model - model
   */
  constructor(model) {
    if (model) {
      this.id = model.id;
      this.startTime = model.startTime;
      this.finishTime = model.finishTime;
      this.isFinished = model.isFinished;
    }
  }
}

module.exports = ExamUltraSimpleModel;
