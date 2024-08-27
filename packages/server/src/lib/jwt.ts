import jwt from 'jsonwebtoken';

export type JwtPayload = {
  id: string;
  email: string;
};

export type Secret = 'JWT_SECRET' | 'JWT_REFRESH' | 'JWT_RESET' | 'JWT_VERIFY';

export const jwtSign = (
  payload: JwtPayload,
  secret: Secret,
  options: jwt.SignOptions = {}
): string => {
  return jwt.sign(payload, process.env[secret], options);
};

export const jwtVerify = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, process.env[secret]) as JwtPayload;
};
