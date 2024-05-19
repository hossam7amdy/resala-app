export interface IFileStorage {
  uploadFile(fileBuffer: Buffer, filename: string): Promise<string>;
  downloadFile(filename: string): Promise<Buffer>;
  deleteFile(filename: string): Promise<void>;
  deleteFiles(filename: string[]): Promise<void>;
  listFiles(filename: string): Promise<string[]>;
  getFileMetadata(filename: string): Promise<FileMetadata>;
}

export interface FileMetadata {
  size: number;
  lastModified: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
