'use strict';
const {query} = require('express-validator/check');

class GetQuestionListDTO {

  /**
   *
   * @param {*} requestQuery - request query
   * @param {Number} requestQuery.count - questions count
   * @param {String} requestQuery.professionCode - question profession code
   * @param {String} requestQuery.userCode - question user code
   */
  constructor(requestQuery) {
    this.count = requestQuery.count;
    this.professionCode = requestQuery.professionCode;
  }

  /**
   * Validate request query
   * @return {[ValidationChainBuilder]} validation chain builder
   */
  static validate() {
    return [
      query('count', 'count is required and it must be a number').isNumeric(),
      query('professionCode', 'professionCode is required and it must be a string').isLength({min: 1}),
      query('userCode', 'userCode is required and it must be a 4 length string').isLength({min: 4, max: 4})
    ];
  }
}

module.exports = GetQuestionListDTO;
