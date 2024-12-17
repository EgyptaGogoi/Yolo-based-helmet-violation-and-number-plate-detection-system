import { Controller, Post, Body, Param, Res } from '@nestjs/common';
import { ImageProcessingService } from './image-processing.service';
import { Response } from 'express';

@Controller('images')
export class ImageProcessingController {
  constructor(private readonly imageProcessingService: ImageProcessingService) {}

  @Post('crop')
  async cropImage() {
    const fileName = "image.jpg"
    const cropData = [
      {
        "x": 390.5,
        "y": 329.5,
        "width": 113,
        "height": 301,
        "confidence": 0.875,
        "class": "person_bike",
        "class_id": 0,
        "detection_id": "c370e574-9bb6-47fc-9219-c13349534003"
      },
      {
        "x": 230.5,
        "y": 330.5,
        "width": 135,
        "height": 299,
        "confidence": 0.852,
        "class": "person_bike",
        "class_id": 0,
        "detection_id": "d3492744-b31c-4680-8056-41488892d642"
      },
      {
        "x": 547,
        "y": 328,
        "width": 112,
        "height": 296,
        "confidence": 0.833,
        "class": "person_bike",
        "class_id": 0,
        "detection_id": "865049cc-20fb-43eb-9716-76337842c1af"
      },
      {
        "x": 72,
        "y": 334.5,
        "width": 144,
        "height": 289,
        "confidence": 0.746,
        "class": "person_bike",
        "class_id": 0,
        "detection_id": "911200a9-ae8f-4997-90e6-6cfbefec9d3b"
      }
    ]
    // const croppedImage = await this.imageProcessingService.cropImageFromData(fileName, cropData);
    return await this.imageProcessingService.cropImageFromData(fileName, cropData);
  }

  private getContentType(extension: string | undefined): string {
    switch (extension) {
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'webp':
        return 'image/webp';
      default:
        return 'application/octet-stream'; // Fallback for unknown types
    }
  }
}
