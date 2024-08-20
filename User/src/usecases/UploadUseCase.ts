import {S3Interface, UserInterface} from '../repositories/interface';

export  class UploadImageUseCase {
  constructor(private s3Repository: S3Interface,
              private userRepository: UserInterface,
            ) {}

  async uploadImage(file: Express.Multer.File,_id:string): Promise<void> {
    try {
      const imageUrl = await this.s3Repository.uploadImage(file);
      console.log(imageUrl,"imaeg")
      const user = await this.userRepository.update({_id},{image:imageUrl})
    } catch (error:any) {
      throw new Error(error.message)
    }
  }
}