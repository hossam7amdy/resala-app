export interface CloudStorage {
  /**
   * Upload a blob to the cloud storage.
   * @param path - The path (key) where the blob should be stored.
   * @param data - The blob data as a Buffer or ReadableStream.
   * @param metadata - Optional metadata to associate with the blob.
   * @returns The URL or identifier of the stored blob.
   */
  uploadBlob(
    path: string,
    data: Buffer | NodeJS.ReadableStream,
    metadata?: Record<string, string>
  ): Promise<string>;

  /**
   * Retrieve a blob from the cloud storage.
   * @param path - The path (key) of the blob to retrieve.
   * @returns A readable stream of the blob data.
   */
  getBlob(path: string): Promise<NodeJS.ReadableStream>;

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
   * Get the public URL of a blob in the cloud storage.
   * @param path - The path (key) of the blob.
   * @returns The public URL of the blob.
   */
  getPublicUrl(path: string): string;

  /**
   * List blobs in the storage with optional filters.
   * @param prefix - The prefix to filter blob keys.
   * @param metadataFilter - Optional metadata filters to apply.
   * @returns A list of blob metadata (e.g., key, size, lastModified).
   */
  listBlobs(prefix?: string, metadataFilter?: Record<string, string>): Promise<BlobMetadata[]>;
}

export interface BlobMetadata {
  key: string;
  url: string;
  size: number;
  lastModified: Date;
  metadata?: Record<string, string>;
}
