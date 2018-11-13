'use strict';
const Database = require('./app/utilities/database');
const App = require('./app/app');
const Umzug = require('umzug');
const Sequelize = require('sequelize');

let database = new Database();

let umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: database.connector
  },
  migrations: {
    params: [
      database.connector.getQueryInterface(),
      Sequelize
    ],
    path: './migrations',
    pattern: /\.js$/
  }
});

const Server = async () => {
  console.log('Running migration!');
  await umzug.up();
  console.log('Migration completed!');

  console.log('Importing models!');
  await database.importModels(__dirname + '/app/models/database/');

  global.DB = database.models;

  App.listen(1234, function () {
    console.log('Server listen on 1234 port');
  });
};

module.exports = Server();
