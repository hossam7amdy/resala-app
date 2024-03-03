import crypto from 'crypto';

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
