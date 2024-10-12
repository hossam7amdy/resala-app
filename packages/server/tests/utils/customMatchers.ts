import { expect } from 'vitest';

expect.extend({
  toBeNullOrString: received => {
    const pass = received === null || typeof received === 'string';
    if (pass) {
      return {
        message: () => `expected ${received} not to be null or a string`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be null or a string`,
        pass: false,
      };
    }
  },

  toBeNullOrNumber: received => {
    const pass = received === null || typeof received === 'number';
    if (pass) {
      return {
        message: () => `expected ${received} not to be null or a number`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be null or a number`,
        pass: false,
      };
    }
  },

  toBeStringWithNumber: received => {
    const pass = typeof received === 'string' && /\d/.test(received);
    if (pass) {
      return {
        message: () => `expected ${received} not to be a string with a number`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be a string with a number`,
        pass: false,
      };
    }
  },

  toBeNullOrObject: (received, matcher) => {
    const pass = received === null || expect(received).toEqual(matcher);
    if (pass) {
      return {
        message: () => `expected not to be null or ${matcher} received ${received}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected to be null or ${matcher} received ${received}`,
        pass: false,
      };
    }
  },

  toBeArrayOfImageObjectMatching: (received, matcher) => {
    const pass =
      Array.isArray(received) &&
      (received.length === 0 ||
        received.every(item => expect(item).toEqual(expect.objectContaining(matcher))));

    if (pass) {
      return {
        message: () =>
          `expected array to be empty or contain objects matching the specified matcher`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected array to be empty or contain objects matching the specified matcher`,
        pass: false,
      };
    }
  },
});
