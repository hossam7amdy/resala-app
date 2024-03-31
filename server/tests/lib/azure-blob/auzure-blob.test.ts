import { expect, jest } from '@jest/globals';

import { deleteBlob, uploadBlob } from '../../../src/lib/azure-storage/azure';

/**
 * Mocking the azure storage module
 * @see https://remarkablemark.org/blog/2018/06/28/jest-mock-default-named-export/
 */
jest.mock('../../../src/lib/azure-storage/azure', () => ({
  __esModule: true, // this property makes it work
  uploadBlob: jest.fn(),
  deleteBlob: jest.fn(),
}));

describe('Azure Blob Storage', () => {
  it('should upload a blob', async () => {
    const filePath = 'path/to/file';
    await uploadBlob(filePath);

    expect(uploadBlob).toHaveBeenCalled();
  });

  it('should delete a blob', async () => {
    const url = 'https://cdn.endpoint.com/public/filename';

    await deleteBlob(url);

    expect(deleteBlob).toHaveBeenCalled();
  });
});
