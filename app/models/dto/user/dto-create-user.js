'use strict';
const {body} = require('express-validator/check');

class CreateUserDTO {

  /**
   *
   * @param {*} requestBody - request body
   * @param {String} requestBody.username - user's user name
   * @param {String} requestBody.fullName - user's full name
   * @param {String} requestBody.password - user's password
   * @param {String} requestBody.verificationCode - user's verification code
   */
  constructor(requestBody) {
    this.username = requestBody.username;
    this.fullName = requestBody.fullName;
    this.password = requestBody.password;
    this.verificationCode = requestBody.verificationCode;
  }

  static validate() {
    return [
      body('username', 'userName is required and must be minimum 8 length').isLength({min: 8}),
      body('fullName', 'fullName is required and must be minimum 1 length').isLength({min: 1}),
      body('password', 'password is required and must be minimum 8 length').isLength({ min: 8 }),
      body('verificationCode', 'password is required and must be minimum 8 length').isLength({ min: 1 })
    ];
  }
}

module.exports = CreateUserDTO;