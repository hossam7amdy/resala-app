/**
 * DefaultAzureCredential will first look for Azure Active Directory
 * (AAD) client secret credential information in the following environment variables:
 *
 * - AZURE_TENANT_ID: The ID of your AAD tenant
 * - AZURE_CLIENT_ID: The ID of your AAD app registration (client)
 * - AZURE_CLIENT_SECRET: The client secret for your AAD app registration
 *
 * If those environment variables aren't found and your application is deployed
 * to an Azure VM or App Service instance, the managed service identity endpoint
 * will be used as a fallback authentication source.
 *
 * @summary authenticate with the storage service using Azure Active Directory
 **/
import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';
import fs from 'fs/promises';

import { ENV } from '../../config/env';

const publicContainer = 'public';
const account = ENV.AZURE_STORAGE_NAME;
const cdnEndpoint = ENV.AZURE_CDN_ENDPOINT;

const storage = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  new DefaultAzureCredential()
);

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
