import crypto from 'crypto';

import { hash } from './hash.js';
import { generateRandomNumber } from './random.js';

/**
 * Generate a hashed password
 *
 * @param password password to hash
 * @returns hashed password, salt, and iterations
 *
 * @example
 *
 * const { hashedPassword, salt, iterations } = await genHashedPassword('password');
 *
 * console.log(hashedPassword, salt, iterations);
 *
 * // output
 *
 * // $argon2id$v=19$m=4096,t=3,p=1$ZGJkZGJkZGQ=$
 * // 9b7e
 * // 4096
 *
 */
export const genHashedPassword = async (password: string) => {
  const iterations = generateRandomNumber(1000, 15000);
  const salt = crypto.randomBytes(80).toString('base64');

  const hashedPassword = await hash(password, salt, iterations);

  return {
    salt,
    iterations,
    hashedPassword: hashedPassword,
  };
};

/**
 * Verify a hashed password
 *
 * @param password password to verify
 * @param salt salt used to hash the password
 * @param iterations number of iterations used to hash the password
 * @param hashedPassword hashed password
 *
 * @returns true if the password is correct, false otherwise
 */
export const verifyHashedPassword = async ({
  password,
  salt,
  iterations,
  hashedPassword,
}: {
  password: string;
  salt: string;
  iterations: number;
  hashedPassword: string;
}) => {
  const hashPassword = await hash(password, salt, iterations);
  return hashPassword === hashedPassword;
};
