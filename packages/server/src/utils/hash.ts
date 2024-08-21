import { pbkdf2 } from 'crypto';
import { promisify } from 'util';

const pdkdf2Async = promisify(pbkdf2);

/**
 * Hash a string using pbkdf2 algorithm with sha512 and base64
 * encoding and return the hashed string as a promise
 *
 * @param str string to hash
 * @param salt salt to use
 * @param iterations number of iterations
 * @returns hashed string
 */
export const hash = async (str: string, salt: string, iterations: number): Promise<string> => {
  const derivedKey = await pdkdf2Async(str, salt, iterations, 150, 'sha512');

  return derivedKey.toString('base64');
};
