const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('vms_db', 'ejmcmk', 'hexasynth', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;
