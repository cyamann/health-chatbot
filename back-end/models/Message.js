const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // db.js dosyasından Sequelize bağlantısını al

const Message = sequelize.define('Message', {
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // Varsayılan olarak geçerli zaman
  },
});

module.exports = Message;
