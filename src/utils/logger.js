const winston = require('winston');
const env = require('../config/env');

const isProd = env.nodeEnv === 'production';

const logger = winston.createLogger({
  level: isProd ? 'info' : 'debug',
  format: isProd
    ? winston.format.json()
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
  transports: [new winston.transports.Console()],
});

module.exports = logger;
