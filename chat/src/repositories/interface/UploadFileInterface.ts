import { FileData } from '../../entities/FIleEntity';

  
export interface UploadFileInterface {
  uploadFile(buffer: Buffer, key: string, contentType: string): Promise<FileData>;
}