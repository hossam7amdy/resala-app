export interface CloudStoragePort {
  /**
   * Get blob metadata from the cloud storage.
   * @param path - The path (key) of the blob.
   * @returns {BlobMetadata} The metadata of the blob.
   */
  getBlobMetadata(path: string): Promise<BlobMetadata>;

  /**
   * Delete a blob from the cloud storage.
   * @param path - The path (key) of the blob to delete.
   * @returns A boolean indicating whether the deletion was successful.
   */
  deleteBlob(path: string): Promise<boolean>;

  /**
   * Generate a pre-signed URL for accessing the blob.
   * @param path - The path (key) of the blob.
   * @param expirySeconds - The expiration time in seconds for the URL.
   * @returns The pre-signed URL.
   */
  generatePresignedUrl(path: string, expirySeconds: number): Promise<string>;

  /**
   * Check if a blob exists in the cloud storage.
   * @param path - The path (key) of the blob to check.
   * @returns A boolean indicating whether the blob exists.
   */
  blobExists(path: string): Promise<boolean>;

  /**
   * List blobs in the storage with optional filters.
   * @param prefix - The prefix to filter blob keys.
   * @param metadataFilter - Optional metadata filters to apply.
   * @returns {BlobMetadata[]} A list of blob metadata (e.g., key, size, lastModified).
   */
  listBlobs(prefix?: string, metadataFilter?: Record<string, string>): Promise<BlobMetadata[]>;
}

export interface BlobMetadata {
  key: string;
  size: number;
  lastModified: Date | string;
  contentType?: string | null;
  metadata?: Record<string, string>;
}
