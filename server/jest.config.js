/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  clearMocks: true,
  forceExit: true,
  detectOpenHandles: true,
  collectCoverage: true,
  coverageDirectory: './tests/coverage',
  globalSetup: './tests/setup/jest.setup.ts',
  globalTeardown: './tests/setup/jest.teardown.ts',
};
