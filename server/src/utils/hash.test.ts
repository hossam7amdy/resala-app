import { hash } from './hash.js';

describe('hash', () => {
  it('should hash a string using pbkdf2 algorithm with sha512 and base64 encoding', async () => {
    const str = 'password';
    const salt = 'somesalt';
    const iterations = 10000;

    const hashedString = await hash(str, salt, iterations);

    expect(hashedString).toBeDefined();
    expect(typeof hashedString).toBe('string');
    expect(hashedString.length).toBeGreaterThan(0);
  });

  it('should throw an error if hashing fails', async () => {
    const str = 11;
    const salt = 'somesalt';
    const iterations = 10000;

    // @ts-ignore
    const result = hash(str, salt, iterations);

    await expect(result).rejects.toThrow();
  });
});
