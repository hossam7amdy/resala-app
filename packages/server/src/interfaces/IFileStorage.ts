export default interface IFileStorage {
  upload(buffer: Buffer, key: string): Promise<string>;
  download(key: string): Promise<Buffer>;
  delete(key: string): Promise<void>;
  deleteMany(key: string[]): Promise<void>;
  list(key: string): Promise<string[]>;
  getMetadata(key: string): Promise<FileMetadata>;
}

export interface FileMetadata {
  size: number;
  lastModified: Date;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
