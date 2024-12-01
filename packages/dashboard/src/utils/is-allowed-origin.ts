import { configuration } from '@/configuration';

export const isAllowedOrigin = (url: string) => {
  const origin = new URL(decodeURIComponent(url)).origin;

  const allowedOrigins = configuration().origin.allowedList;

  return allowedOrigins.includes(origin);
};
