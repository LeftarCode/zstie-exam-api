'use strict';

const QuestionsErrors = {};

QuestionsErrors.CREATE_WRONG_DATA = {
  errorCode: 1001,
  statusCode: 400,
  developerMessage: 'Wrong data!'
};

QuestionsErrors.ALREADY_EXIST_EXAM_WITH_OTHER_CODE = {
  errorCode: 1002,
  statusCode: 409,
  developerMessage: 'User already has active exam with other profession code!'
};

QuestionsErrors.UNEXPECTED_ERROR = {
  errorCode: 1003,
  statusCode: 500,
  developerMessage: 'Unexpected error occurred!'
};

QuestionsErrors.NOT_IMPLEMENTED = {
  errorCode: 1999,
  statusCode: 501,
  developerMessage: 'Feature is not implemented'
};

module.exports = QuestionsErrors;
