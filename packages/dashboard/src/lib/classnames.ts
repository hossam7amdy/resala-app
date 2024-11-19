import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const classnames = (...args: ClassValue[]) => twMerge(clsx(args));
