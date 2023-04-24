const { Sequelize, DataTypes } = require('sequelize');
const db = require('../backend/config/database');

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  githubId: {
    type: DataTypes.STRING,
    allowNull: true, // not all users will use GitHub to sign up
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNum: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  addressLine1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressLine2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  Sequelize,
  modelName: 'User',
  timestamps: true,
  freezeTableName: true,
});

module.exports = User;