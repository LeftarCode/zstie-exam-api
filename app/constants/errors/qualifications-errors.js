'use strict';

const QualificationsErrors = {};

QualificationsErrors.CREATE_WRONG_DATA = {
  errorCode: 4001,
  statusCode: 400,
  developerMessage: 'Wrong data!'
};

QualificationsErrors.UNEXPECTED_ERROR = {
  errorCode: 4002,
  statusCode: 500,
  developerMessage: 'Unexpected error occurred!'
};

QualificationsErrors.NOT_IMPLEMENTED = {
  errorCode: 4999,
  statusCode: 501,
  developerMessage: 'Feature is not implemented'
};

module.exports = QualificationsErrors;
