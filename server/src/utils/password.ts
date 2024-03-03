import crypto from 'crypto';

import { hash } from './hash';
import random from './random';

export const genHashedPassword = async (password: string) => {
  const iterations = random.generateRandomNumber(1000, 15000);
  const salt = crypto.randomBytes(80).toString('base64');

  const hashedPassword = await hash(password, salt, iterations);

  return {
    salt,
    iterations,
    hashedPassword: hashedPassword,
  };
};

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
