import { configuration } from '../configuration/index.js';

export const isAllowedOrigin = (url: string) => {
  const origin = new URL(url).origin;

  const allowedOrigins = configuration.origin.allowedList;

  return allowedOrigins.includes(origin);
};
