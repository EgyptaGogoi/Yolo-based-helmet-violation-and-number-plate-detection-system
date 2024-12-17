import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ImageProcessingService } from 'src/image-processing/image-processing.service';

@Injectable()
export class DetectRiderService {

    constructor( private readonly imageProcessingService: ImageProcessingService ){}

    async detect_rider(imageUrl: string): Promise<any>{
        try {
            const response = await axios({
            method: 'POST',
            url: "https://detect.roboflow.com/person-on-bike/2",
            params: {
                api_key: "ALi15MAfe2TMEwydwlS0",
                image: imageUrl
            },
            });

            
            return response.data.predictions
            // return this.imageProcessingService.cropImageFromData(response.data.predictions)
            // return this.cropRider.cropRiders(imageUrl,response.data.predictions); // Return the detection result
        } catch (error) {
            // Handle errors gracefully and throw NestJS-friendly exceptions
            return error;
        }   
    }
}
