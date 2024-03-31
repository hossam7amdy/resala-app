/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  globalSetup: './tests/jest.setup.ts',
  globalTeardown: './tests/jest.teardown.ts',
};
