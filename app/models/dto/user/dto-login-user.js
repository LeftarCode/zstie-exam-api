'use strict';
const {body} = require('express-validator/check');

class LoginUserDTO {

  /**
   *
   * @param {*} requestBody - request body
   * @param {String} requestBody.username - user's username
   * @param {String} requestBody.password - user's password
   */
  constructor(requestBody) {
    this.username = requestBody.username;
    this.password = requestBody.password;
  }

  static validate() {
    return [
      body('username', 'userName is required and must be minimum 8 length').isLength({min: 8}),
      body('password', 'fullName is required and must be minimum 8 length').isLength({min: 8}),
    ];
  }
}

module.exports = LoginUserDTO;
