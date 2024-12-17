import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {

    constructor(private readonly uploadService: UploadService ){}

    @Post('from-url')
    async uploadFromUrl(@Body('fileUrl') fileUrl: string) {
        // const filename = fileUrl.split('/').pop();
        const filename = "image.jpg";
        if (!filename) {
        throw new Error('Invalid file URL');
        }
        const filePath = await this.uploadService.uploadFileFromUrl(fileUrl, filename);
        return { message: 'File uploaded successfully', filePath };
    }
}
