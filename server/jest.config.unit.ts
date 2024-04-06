import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  collectCoverage: true,
  testPathIgnorePatterns: ['<rootDir>/src/tests'],
  setupFilesAfterEnv: ['<rootDir>/src/lib/__mocks__/prisma.ts'],
};

export default config;
