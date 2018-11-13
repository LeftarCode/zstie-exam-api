'use strict';
const Defaults = require('./defaults');

let EnvironmentVariables = {};

EnvironmentVariables.DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING ||
  Defaults.DB_CONNECTION_STRING;

EnvironmentVariables.SALT = process.env.SALT ||
  Defaults.SALT;

EnvironmentVariables.JWT_SECRET = process.env.JWT_SECRET ||
  Defaults.JWT_SECRET;

module.exports = EnvironmentVariables;
