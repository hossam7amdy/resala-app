import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const classnames = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};
