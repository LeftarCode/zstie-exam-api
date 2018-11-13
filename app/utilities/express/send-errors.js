'use strict';

module.exports = function (req, res, next) {

  /**
   * @memberOf res
   * @param {object} error - error model
   * @param {number} error.statusCode - status code
   * @param {number} error.errorCode - error code
   * @param {string} error.developerMessage - developer message
   * @param {*} [moreInfo] - more info details
   * @return {undefined} return nothing
   */
  res.sendError = function (error, moreInfo) {
    error.moreInfo = moreInfo || null;

    res.status(error.statusCode).json(error);
  };

  next();
};
