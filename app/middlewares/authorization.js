'use strict';
const SecurityUtilities = require('../utilities/security/security-utilities');
const AuthorizationErrors = require('../constants/errors/authorization-errors');

let Authorization = {
  errors: {
    unauthenticated: function (res) {
      let errorResponse = {};

      errorResponse.errorCode = 401;
      errorResponse.userMessage = 'Access denied!';
      errorResponse.developerMessage = 'Access denied!';

      res.status(401).json(errorResponse);
    },
    fobidden: function (res) {
      let errorResponse = {};

      errorResponse.errorCode = 403;
      errorResponse.userMessage = 'Forbidden!';
      errorResponse.developerMessage = 'User doesn\'t have permission or you didn\'t set token!';

      res.status(403).json(errorResponse);
    }
  },
  authorizationHandler: async function (req, res, next) {
    let authorizationHeader = req.header('Authorization');
    let allowEndpoints = {
      '/login': ['post'],
      '/user': ['post'],
    };

    for (let endpoint in allowEndpoints) {
      if (typeof(allowEndpoints[endpoint]) !== 'undefined') {
        if (req.path === endpoint && allowEndpoints[endpoint].indexOf(req.method.toLocaleLowerCase()) !== -1) {
          return next();
        }
      }
    }

    if (!authorizationHeader) {
      Authorization.errors.unauthenticated(res);
      return next(AuthorizationErrors.ACCESS_DENIED);
    }

    let header = authorizationHeader.split(' ');
    let type = header[0].toLowerCase() || null;
    let token = header[1] || null;

    if (type !== 'bearer') {
      Authorization.errors.unauthenticated(res);
      return next(AuthorizationErrors.ACCESS_DENIED);
    }


    let user = await SecurityUtilities.verifyJWT(token);

    if (user.error) {
      AppLogger.trackException(user.error);

      return res.sendError(AuthorizationErrors.ACCESS_DENIED);
    }

    if (!user.user) {
      return res.sendError(AuthorizationErrors.ACCESS_DENIED);
    }

    req.user = user.user;

    return next();
  }
};

module.exports = Authorization;
