import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, errors, colorize, json, printf } = format;

const logFormat = printf(({ level, stack, message, timestamp }) => {
  return `${new Date(timestamp).toISOString()} | ${level.toUpperCase()}: ${stack || message}`;
});

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json(), errors({ stack: true })),

  transports: [
    new DailyRotateFile({
      filename: 'logs/combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error',
    }),
  ],

  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })],
  rejectionHandlers: [new transports.File({ filename: 'logs/rejections.log' })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(logFormat, colorize({ all: true })),
    })
  );
}

export { logger };
