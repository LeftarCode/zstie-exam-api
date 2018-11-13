'use strict';

/**
 * @template T
 * @constructor
 * @param {null|{statusCode:Number,errorCode:Number,developerMessage:String}} error error object
 * @param {T} [data] service result data
 */
function ServiceResult(error, data) {
  this.error = error;
  this.data = data;
  this.isSuccess = !error;
}

/** @type {T} */
ServiceResult.prototype.data = null;

module.exports = ServiceResult;
