'use strict';
const easyPbkdf2 = require('easy-pbkdf2')();
const jwt = require('jsonwebtoken');
const EnvironmentVariables = require('../../config/environment-variables');

class Security {

  /**
   *
   * @param {String} password - password to hash
   * @returns {Promise<String>} - return hashed password
   */
  static async hashPassword(password) {
    return new Promise((resolve, reject) => {
      easyPbkdf2.secureHash(password, EnvironmentVariables.SALT, function (err, passwordHash) {
        if (err) {
          reject(err);
        } else {
          resolve(passwordHash);
        }
      });
    });
  }

  /**
   *
   * @param {String} password - password to verify
   * @param {String} passwordHash - hashed password to compare
   * @returns {Promise<Boolean>} - return true if same passwords
   */
  static async verifyPassword(password, passwordHash) {
    return new Promise((resolve, reject) => {
      easyPbkdf2.verify(EnvironmentVariables.SALT, passwordHash, password, function (err, valid) {
        if (err) {
          reject(err);
        } else {
          resolve(valid);
        }
      });
    });
  }

  /**
   *
   * @param {String} username - username to claims
   * @param {*} secret - secrets to claims
   * @returns {Promise<*>} - return jwt sign promise
   */
  static async createJWT(username, secret) {
    const claims = {
      sub: username,
      sec: secret
    };

    return jwt.sign(claims, EnvironmentVariables.JWT_SECRET);
  }

  static async verifyJWT(token) {
    try {
      let decoded = jwt.verify(token, EnvironmentVariables.JWT_SECRET);

      if (decoded) {
        let username = decoded.sub || null;
        let secret = decoded.sec || null;

        if (!secret) {
          return {error: null, user: null};
        }

        return {
          error: false, user: await DB.User.findOne({
            where: {
              username: username
            }
          })
        };
      }

    } catch (error) {
      return {error: error.constructor.name === 'JsonWebTokenError' ? null : error, user: null};
    }
  };
}

module.exports = Security;
