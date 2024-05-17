export interface IFileStorage {
  uploadFile(localFilePath: string, remoteDestination: string): Promise<void>;
  downloadFile(remoteSource: string, localDestination: string): Promise<void>;
  deleteFile(remoteFilePath: string): Promise<void>;
  deleteFiles(remoteFilePaths: string[]): Promise<void>;
  listFiles(remoteDirectory: string): Promise<string[]>;
  getFileMetadata(remoteFilePath: string): Promise<FileMetadata>;
}

export interface FileMetadata {
  size: number;
  lastModified: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
