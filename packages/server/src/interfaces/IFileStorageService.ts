export default interface IFileStorageService {
  uploadFile(buffer: Buffer, key: string): Promise<string>;
  downloadFile(key: string): Promise<Buffer>;
  deleteFile(key: string): Promise<void>;
  deleteFiles(key: string[]): Promise<void>;
  listFiles(key: string): Promise<string[]>;
  getFileMetadata(key: string): Promise<FileMetadata>;
}

export interface FileMetadata {
  size: number;
  lastModified: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
