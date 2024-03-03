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

import ENV from '../../env';

const account = ENV.AZURE_STORAGE_NAME;

export const storage = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  new DefaultAzureCredential()
);
