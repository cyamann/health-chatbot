const winston = require('winston');
const path = require('path');

// Logs klasörünü belirle
const logsDir = path.join(__dirname, '../../logs');

// Winston'un renkli çıktı ayarları
const customLevels = {
  levels: {
    critical: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    critical: 'red bold',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    debug: 'blue',
  },
};


winston.addColors(customLevels.colors);

const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
    }),
    new winston.transports.Console({
      level: 'debug', 
      format: winston.format.combine(
        winston.format.colorize(), 
        winston.format.simple()
      ),
    }),
  ],
});

// Logger'ı dışa aktar
module.exports = { logger };