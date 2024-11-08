const app = require('./src/app');
const { logger } = require('./src/config/logger');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 5000;

global.logger = logger;

function startServer() {
  sequelize.sync({ force: false })
    .then(() => {
      global.logger.info('Database synchronized successfully.');

      const server = app.listen(PORT, () => {
        global.logger.info(`Server is running on http://localhost:${PORT}`);
      });

      server.on('error', (err) => {
        global.logger.critical(`Server error: ${err.message}`);
        restartServer();
      });

    })
    .catch((err) => {
      global.logger.error(`Database synchronization failed: ${err.message}`);
      restartServer();
    });
}

function restartServer() {
  global.logger.warn('Restarting server in 5 seconds...');
  setTimeout(startServer, 5000); 
}

process.on('uncaughtException', (err) => {
  global.logger.critical(`Uncaught Exception: ${err.message}`);
  restartServer();
});

startServer();
