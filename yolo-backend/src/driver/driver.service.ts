import { Injectable } from '@nestjs/common';
import { DetectRiderService } from 'src/detect-rider/detect-rider.service';
import { DetectViolationService } from 'src/detect-violation/detect-violation.service';
import { ImageProcessingService } from 'src/image-processing/image-processing.service';
import { UploadService } from 'src/upload/upload.service';
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class DriverService {

    constructor(
        private readonly uploadService: UploadService,
        private readonly detectRiderService: DetectRiderService,
        private readonly imageProcessingService: ImageProcessingService,
        private readonly detectViolationService: DetectViolationService
    ){}

    // Detection with URL
    async driverWithUrl(imageUrl: string){

        // upload the image
        // const upload = await this.uploadService.uploadFileFromUrl(imageUrl, "image.jpg");
        // // console.log(upload);
        // // detect rider
        const detect_riders_prediction = await this.detectRiderService.detect_rider(imageUrl)
        // // imageProcessing
        const images_paths = await this.imageProcessingService.cropImageFromData(detect_riders_prediction)
        // // detect violation
        return this.detectViolationService.detectViolation(images_paths.paths)
    }

    async getNumberPlate(path: string, boudingBox: any[]){
        return  await this.imageProcessingService.cropNumberPlate(path, boudingBox)
    }   
}
