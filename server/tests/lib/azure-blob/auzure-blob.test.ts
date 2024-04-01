import { expect } from '@jest/globals';

import { deleteBlobMock, uploadBlobMock } from '../../__mocks__/azure-storage';

describe('Azure Blob Storage', () => {
  it('should upload a blob', async () => {
    const filePath = 'path/to/file';
    await uploadBlobMock(filePath);

    expect(uploadBlobMock).toHaveBeenCalled();
  });

  it('should delete a blob', async () => {
    const url = 'https://cdn.endpoint.com/public/filename';

    await deleteBlobMock(url);

    expect(deleteBlobMock).toHaveBeenCalled();
  });
});
