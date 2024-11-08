const User = require('./User');
const RefreshToken = require('./RefreshToken');
const Article = require('./Article');
const Visit = require('./Visit');

User.hasMany(RefreshToken, { foreignKey: 'userId', onDelete: 'CASCADE' });
RefreshToken.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  User,
  RefreshToken,
  Article,
  Visit
};
