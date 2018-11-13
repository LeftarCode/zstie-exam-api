'use strict';

module.exports = {
  dialectOptions: {
    encrypt: true
  },
  pool: {
    max: 5,
    min: 0,
    idle: 20000,
    acquire: 20000,
    evict: 20000,
    handleDisconnects: true
  }
};
