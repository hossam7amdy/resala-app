import crypto from 'crypto';

/**
 * Generate a random string of characters
 *
 * @param length length of the random string
 * @returns string of random characters
 */
export const generateRandomString = (length: number) => {
  return crypto.randomBytes(length).toString('hex').slice(0, length);
};

/**
 * Generate a random number between min and max
 *
 * @param min minimum number
 * @param max maximum number
 * @returns random number
 *
 * @example
 *
 * generateRandomNumber(1, 10) // 5
 *
 */
export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
