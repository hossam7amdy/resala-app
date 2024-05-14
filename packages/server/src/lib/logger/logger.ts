import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, errors, colorize } = format;

const levels = {
  error: 0,
  debug: 1,
  warn: 2,
  data: 3,
  info: 4,
};

const logFormat = printf(({ level, stack, message, timestamp }) => {
  return `${new Date(timestamp).toISOString()} | ${level.toUpperCase()}: ${stack || message}`;
});

const logger = createLogger({
  levels: levels,
  level: 'info',
  format: combine(timestamp(), errors({ stack: true })),

  transports: [
    new transports.Console({
      level: 'info',
      format: combine(logFormat, colorize({ all: true })),
    }),
  ],
});

export { logger };
