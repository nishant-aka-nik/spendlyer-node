import { format as _format, createLogger, transports as _transports } from 'winston';

// Create a custom log format to stringify objects and arrays
const customFormat = _format((info) => {
  if (info.message instanceof Object) {
    info.message = JSON.stringify(info.message, null, 2);
  }
  return info;
});

// Create a new logger instance
const logger = createLogger({
  level: 'info', // Set the default log level
  format: _format.combine(
    _format.colorize(), // Add colors to the console output
    _format.timestamp(), // Add a timestamp to each log entry
    customFormat(), // Use the custom format to handle object formatting
    _format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level}: ${message}`;
    })
  ),
  transports: [
    new _transports.Console(),
    new _transports.File({ filename: 'error.log', level: 'error' }),
    new _transports.File({ filename: 'combined.log' }),
  ],
});

export default logger;
