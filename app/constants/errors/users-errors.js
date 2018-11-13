'use strict';

const UsersErrors = {};

UsersErrors.CREATE_WRONG_DATA = {
  errorCode: 3001,
  statusCode: 400,
  developerMessage: 'Wrong data!'
};

UsersErrors.LOGIN_WRONG_DATA = {
  errorCode: 3002,
  statusCode: 400,
  developerMessage: 'Wrong login data!'
};

UsersErrors.LOGIN_WRONG_PASSWORD = {
  errorCode: 3003,
  statusCode: 401,
  developerMessage: 'Wrong password!'
};

UsersErrors.LOGIN_USER_NOT_FOUND = {
  errorCode: 3004,
  statusCode: 404,
  developerMessage: 'User with selected username doesn\'t exist'
};

UsersErrors.VERIFICATION_CODE_NOT_FOUND = {
    errorCode: 3100,
    statusCode: 404,
    developerMessage: 'Verification code doesn\'t exist'
};

UsersErrors.USER_ALREADY_EXISTS = {
  errorCode: 3005,
  statusCode: 409,
  developerMessage: 'User with selected username already exists!'
};

UsersErrors.UNEXPECTED_ERROR = {
  errorCode: 3006,
  statusCode: 500,
  developerMessage: 'Unexpected error occurred!'
};

UsersErrors.VERIFICATION_CODE_WRONG_DATA = {
    errorCode: 3002,
    statusCode: 400,
    developerMessage: 'Wrong verification code data!'
};

UsersErrors.NOT_IMPLEMENTED = {
  errorCode: 3999,
  statusCode: 501,
  developerMessage: 'Feature is not implemented'
};

module.exports = UsersErrors;
