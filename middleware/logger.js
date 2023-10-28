const winston = require('winston');

// Create a custom log format to stringify objects and arrays
const customFormat = winston.format((info) => {
  if (info.message instanceof Object) {
    info.message = JSON.stringify(info.message, null, 2);
  }
  return info;
});

// Create a new logger instance
const logger = winston.createLogger({
  level: 'info', // Set the default log level
  format: winston.format.combine(
    winston.format.colorize(), // Add colors to the console output
    winston.format.timestamp(), // Add a timestamp to each log entry
    customFormat(), // Use the custom format to handle object formatting
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = logger;
