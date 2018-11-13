'use strict';
const {body} = require('express-validator/check');

class SendExamDTO {

  constructor(requestBody) {
    this.questionsId = requestBody.questionsId;
    this.answersIndices = requestBody.answersIndices;
  }

  static validate() {
    return [
      body('questionsId', 'question is required must be array of UUID').isUUID(4),
      body('answersIndices', 'answersIndices is required must be array of numbers').isNumeric()
    ];
  }
}

module.exports = SendExamDTO;
