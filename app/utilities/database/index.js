'use strict';
const Sequelize = require('sequelize');
const EnvironmentVariables = require('../../config/environment-variables');
const DatabaseConfig = require('../../config/database');
const FS = require('fs');

class Database {
  constructor() {
    this.connector = new Sequelize(EnvironmentVariables.DB_CONNECTION_STRING, DatabaseConfig);
    this.connector.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        console.error('Unable to connect to the database', err);
      });

    this.models = null;
  }

  /**
   * Import database models
   * @param {string} directoryPath - path to models directory
   * @return {Promise<Array>} - promise with imported models
   */
  async importModels(directoryPath) {
    let self = this;

    return new Promise((resolve, reject) => {
      FS.readdir(directoryPath.toString(), function (err, files) {
        if (err) {
          return reject(err);
        }

        let modelNames = self._importModels(directoryPath, files);

        resolve(modelNames);
      });
    });
  }

  /**
   * @param {string} directoryPath - directory path
   * @param {Array<string>} files files
   * @return {Array<string>} model names
   * @private
   */
  _importModels(directoryPath, files) {
    let modelNames = [];
    let models = {};

    files
      .filter(file => {
        return file.indexOf('.js') >= 0 && file.indexOf('.') !== 0;
      })
      .forEach(file => {
        let model = this.connector.import(directoryPath + file);

        models[model.name] = model;
        modelNames.push(model.name);
      });

    Object.keys(models).forEach(function (modelName) {
      if ('associate' in models[modelName] && typeof models[modelName].associate === 'function') {
        models[modelName].associate(models);
      }
    });

    this.models = models;
    return modelNames;
  }

  sync() {
    this.connector.sync({force: true});
  }
}

module.exports = Database;
