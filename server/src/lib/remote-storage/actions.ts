import fs from 'fs/promises';

import ENV from '../../env';
import { storage } from './azure-config';

const publicContainer = 'public';
const cdnEndpoint = ENV.AZURE_CDN_ENDPOINT;

export const uploadBlob = async (file: Express.Multer.File) => {
  const container = storage.getContainerClient(publicContainer);

  const buffer = await fs.readFile(file.path);
  await container.uploadBlockBlob(file.filename, buffer, file.size);

  return `${cdnEndpoint}/${publicContainer}/${file.filename}`;
};

export const deleteBlob = async (url: string) => {
  const container = storage.getContainerClient(publicContainer);
  const filename = url.replace(`${cdnEndpoint}/${publicContainer}/`, '');
  return container.deleteBlob(filename);
};
