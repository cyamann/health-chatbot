const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Chat = require('./chat');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sender: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['user', 'bot']],
    },
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

Chat.hasMany(Message, { foreignKey: 'chatId', onDelete: 'CASCADE' });
Message.belongsTo(Chat, { foreignKey: 'chatId' });

module.exports = Message;
