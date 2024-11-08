const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Visit = sequelize.define('Visit', {
  date: {
    type: DataTypes.DATEONLY, 
    allowNull: false,
    unique: true, 
  },
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0, 
    allowNull: false,
  },
});
module.exports = Visit;