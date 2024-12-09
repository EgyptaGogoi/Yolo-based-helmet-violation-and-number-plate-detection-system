import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { YoloService } from './yolo.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('yolo')
export class YoloController {
    constructor(private readonly yoloService: YoloService){}

    @Post('local')
    @UseInterceptors(FileInterceptor('file'))
    async interLocalImage(@UploadedFile() file: Express.Multer.File){   
        if(!file) {
            throw new Error('File not provided');
        }
        return this.yoloService.inferLocalImage(file.path);
    }

    @Post()
    async inferImageUrl() {
        // if (!imageUrl) {
        // throw new Error('Image URL not provided');
        // }
        return this.yoloService.inferImageUrl("https://images.pexels.com/photos/529782/pexels-photo-529782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
    }
}
