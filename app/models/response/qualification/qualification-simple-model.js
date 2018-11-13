'use strict';

class QualificationSimpleModel {

  /**
   * @param {*} model - qualification model
   * @param {String} model.code - qualification code
   * @param {String} model.pictureUrl - qualification url picture
   */
  constructor(model) {
    this.code = model.code;
    this.pictureUrl = model.pictureUrl;
  }
}

module.exports = QualificationSimpleModel;
