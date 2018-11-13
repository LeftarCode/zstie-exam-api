'use strict';

const ExamsErrors = {};

ExamsErrors.CREATE_WRONG_DATA = {
  errorCode: 2001,
  statusCode: 400,
  developerMessage: 'Wrong data!'
};

ExamsErrors.GET_WRONG_DATA = {
  errorCode: 2002,
  statusCode: 400,
  developerMessage: 'Wrong data!'
};

ExamsErrors.EXAM_NOT_FOUND = {
  errorCode: 2003,
  statusCode: 404,
  developerMessage: 'Exam not found!'
};

ExamsErrors.UNEXPECTED_ERROR = {
  errorCode: 2004,
  statusCode: 500,
  developerMessage: 'Unexpected error occurred!'
};

ExamsErrors.NOT_IMPLEMENTED = {
  errorCode: 2999,
  statusCode: 501,
  developerMessage: 'Feature is not implemented'
};

module.exports = ExamsErrors;
