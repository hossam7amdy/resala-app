import crypto from 'crypto';

module random {
  export const generateRandomString = (length: number) => {
    return crypto.randomBytes(length).toString('hex');
  };

  export const generateRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
}

export default random;
