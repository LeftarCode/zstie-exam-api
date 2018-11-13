'use strict';

const AuthorizationErrors = {};

AuthorizationErrors.ACCESS_DENIED = {
  errorCode: 9001,
  statusCode: 401,
  developerMessage: 'Access denied!'
};

AuthorizationErrors.FORBIDDEN = {
  errorCode: 9002,
  statusCode: 403,
  developerMessage: 'User doesn\'t have permission or you didn\'t set token!'
};

AuthorizationErrors.EXAM_NOT_FOUND = {
  errorCode: 9003,
  statusCode: 404,
  developerMessage: 'Exam not found!'
};

AuthorizationErrors.UNEXPECTED_ERROR = {
  errorCode: 9004,
  statusCode: 500,
  developerMessage: 'Unexpected error occurred!'
};

AuthorizationErrors.NOT_IMPLEMENTED = {
  errorCode: 9999,
  statusCode: 501,
  developerMessage: 'Feature is not implemented'
};

module.exports = AuthorizationErrors;
