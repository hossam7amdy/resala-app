import crypto from 'crypto';

/**
 * Hash a string using pbkdf2 algorithm with sha512 and base64 encoding and return the hashed string as a promise
 *
 * @param str string to hash
 * @param salt salt to use
 * @param iterations number of iterations
 * @returns hashed string
 */
export const hash = (str: string, salt: string, iterations: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(str, salt, iterations, 150, 'sha512', (err, derivedKey) => {
      if (err) {
        reject(err);
      }
      resolve(derivedKey.toString('base64'));
    });
  });
};
