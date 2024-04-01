import { jest } from '@jest/globals';

import { deleteBlob, uploadBlob } from '../../src/lib/azure-storage/azure';

/**
 * Mocking the azure storage module
 * @see https://remarkablemark.org/blog/2018/06/28/jest-mock-default-named-export/
 */
jest.mock('../../src/lib/azure-storage/azure', () => ({
  __esModule: true, // this property makes it work
  uploadBlob: jest.fn(),
  deleteBlob: jest.fn(),
}));

export const uploadBlobMock = uploadBlob as jest.MockedFunction<typeof uploadBlob>;
export const deleteBlobMock = deleteBlob as jest.MockedFunction<typeof deleteBlob>;
