import crypto from 'crypto';

export const generateRandomString = (length: number) => {
  return crypto.randomBytes(length).toString('hex');
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
