import { UploadFileInterface } from '../repositories/interface';
import { FileData } from '../entities/FIleEntity';


export class UploadFileUseCase {
  constructor(private fileRepository: UploadFileInterface) {}

  async fileUpload(buffer: Buffer, originalName: string, contentType: string): Promise<FileData> {
    const key = `${Date.now()}_${originalName}`;
    return this.fileRepository.uploadFile(buffer, key, contentType);
  }
}