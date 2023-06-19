const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const path = require('path');

// Define the log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create a logger instance
const logger = createLogger({
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console(), // Output logs to the console
    new transports.File({
      filename: path.join(__dirname, 'logs', 'error.log'), // Path to the error log file
      level: 'error', // Only log errors to this file
    }),
    new transports.File({
      filename: path.join(__dirname, 'logs', 'combined.log'), // Path to the combined log file
    }),
  ],
});

module.exports = logger;
