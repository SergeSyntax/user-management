require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
var path = require('path');
var appDir = path.dirname(require.main.filename);

module.exports = function() {
  const {
    combine,
    timestamp,
    prettyPrint,
    colorize,
    align,
    printf
  } = winston.format;
  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        filename: `${appDir}/logs/server-log.txt`,
        format: combine(timestamp(), prettyPrint()),
        level: 'error'
      }),
      new winston.transports.Console({
        handleExceptions: true,
        handleRejections: true,
        format: combine(
          colorize(),
          timestamp(),
          align(),
          printf(info => {
            const { timestamp, level, message, ...args } = info;
  
            const ts = timestamp.slice(0, 19).replace('T', ' ');
            return `${ts} [${level}]: ${message} ${
              Object.keys(args).length ? JSON.stringify(args, null, 2) : ''
            }`;
          })
        )
      })
    ]
  });
  
  winston.add(logger);
  winston.add(
    new winston.transports.MongoDB({
      db: 'mongodb://localhost/user-management',
      level: 'error',
      metaKey: 'meta'
    })
  );
}

process.on('unhandledRejection', ex => {
  throw ex;
});