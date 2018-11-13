'use strict';

class UserLoginSimpleModel {
  /**
   *
   * @param {*} model - user model
   * @param {*} model.user - user data
   * @param {string} model.token - user token
   * @param {string} model.user.fullName - user's full name
   * @param {string} model.user.class - user's class
   */
  constructor(model) {
    this.token = model.token;
    this.fullName = model.user.fullName;
    this.className = model.user.class;
    this.userId = model.user.id;
  }
}

module.exports = UserLoginSimpleModel;
