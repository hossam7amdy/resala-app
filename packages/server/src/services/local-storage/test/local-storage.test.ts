import fs from 'fs/promises';
import path from 'path';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { LocalStorage } from '../local-storage';

describe('LocalStorage', () => {
  let localStorage: LocalStorage;
  const testRootDirectory = 'test_uploads';
  const baseUrl = 'http://localhost:5000';

  beforeEach(() => {
    localStorage = new LocalStorage({ baseUrl, rootDirectory: testRootDirectory });
  });

  afterAll(async () => {
    // Clean up the test directory after all tests
    try {
      await fs.rm(path.join(process.cwd(), testRootDirectory), { recursive: true, force: true });
    } catch (error) {
      console.error('Error cleaning up test directory:', error);
    }
  });

  it('should write a file to the correct path and delete it', async () => {
    const testFile = {
      buffer: Buffer.from('test content'),
      originalname: 'test.txt',
    } as Express.Multer.File;

    const key = 'test-file.txt';

    // Upload the file
    const uploadedUrl = await localStorage.upload(testFile, key);

    // Check if the file exists
    const filePath = path.join(process.cwd(), testRootDirectory, key);
    const fileExists = await localStorage.exists(key);
    expect(fileExists).toBe(true);

    // Check if the content is correct
    const fileContent = await fs.readFile(filePath, 'utf-8');
    expect(fileContent).toBe('test content');

    // Check if the returned URL is correct
    expect(uploadedUrl).toBe(`${baseUrl}/${testRootDirectory}/${key}`);

    // Delete the file
    await localStorage.delete(key);

    // Check if the file has been deleted
    const fileExistsAfterDelete = await localStorage.exists(key);
    expect(fileExistsAfterDelete).toBe(false);
  });

  it('should create a directory if it does not exist', async () => {
    const testDir = path.join(process.cwd(), testRootDirectory, 'nested', 'dir');

    const result = await localStorage.createDirectoryIfNotExist(testDir);
    expect(result).toBe('CREATED');

    const dirExists = await fs
      .access(testDir)
      .then(() => true)
      .catch(() => false);
    expect(dirExists).toBe(true);

    // Clean up
    await fs.rm(path.join(process.cwd(), testRootDirectory, 'nested'), {
      recursive: true,
      force: true,
    });
  });

  it('should return EXIST if directory already exists', async () => {
    const testDir = path.join(process.cwd(), testRootDirectory, 'existing');
    await fs.mkdir(testDir, { recursive: true });

    const result = await localStorage.createDirectoryIfNotExist(testDir);
    expect(result).toBe('EXIST');

    // Clean up
    await fs.rm(testDir, { recursive: true, force: true });
  });

  it('should delete multiple files', async () => {
    const testFiles = [
      { buffer: Buffer.from('content1'), originalname: 'file1.txt' },
      { buffer: Buffer.from('content2'), originalname: 'file2.txt' },
    ] as Express.Multer.File[];

    const keys = ['file1.txt', 'file2.txt'];

    // Upload files
    for (let i = 0; i < testFiles.length; i++) {
      await localStorage.upload(testFiles[i], keys[i]);
    }

    // Delete multiple files
    await localStorage.deleteMany(keys);

    // Check if files have been deleted
    for (const key of keys) {
      const fileExists = await localStorage.exists(key);
      expect(fileExists).toBe(false);
    }
  });
});
