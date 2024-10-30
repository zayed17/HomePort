import PropertyService from "../infrastructure/S3/S3Service";

export class PresignedUseCase {
    constructor(private presignedUrl: PropertyService,
    ) { }
    async preSignedUrl(files: any): Promise<any[]> {
        const url = await this.presignedUrl.generatePresignedUrls(files)
        console.log(url,"chekcs")
        return url
    }
}
