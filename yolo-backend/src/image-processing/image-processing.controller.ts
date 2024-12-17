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
        "x": 28,
        "y": 217,
        "width": 56,
        "height": 16,
        "confidence": 0.7187662720680237,
        "class": "Number Plate",
        "class_id": 0,
        "detection_id": "3af20110-4ff7-4af2-ac78-9c99d6c959d2"
    }
    ]
    // const croppedImage = await this.imageProcessingService.cropImageFromData(fileName, cropData);
    return await this.imageProcessingService.cropImageFromData(cropData);
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
