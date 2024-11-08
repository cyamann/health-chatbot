const { Sequelize } = require('sequelize');
require('dotenv').config(); // .env dosyasını kullanabilmek için

// .env dosyasından veritabanı bilgilerini al
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

// Bağlantıyı kontrol et
sequelize.authenticate()
  .then(() => console.log('Veritabanına başarılı şekilde bağlanıldı.'))
  .catch(err => console.error('Veritabanı bağlantı hatası:', err));

module.exports = sequelize;
