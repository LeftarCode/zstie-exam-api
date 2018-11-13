'use strict';
const {query} = require('express-validator/check');

class GetExamDTO {

  /**
   *
   * @param {*} requestQuery - request query
   * @param {String} requestQuery.id - exam id
   */
  constructor(requestQuery) {
    this.id = requestQuery.id;
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

module.exports = GetExamDTO;