import { Controller, Post, Body, Param, Res } from '@nestjs/common';
import { ImageProcessingService } from './image-processing.service';
import { Response } from 'express';

@Controller('images')
export class ImageProcessingController {
  constructor(private readonly imageProcessingService: ImageProcessingService) {}

  @Post('crop')
  async cropImage(
    @Res() res: Response,
  ) {
    const fileName = "image.jpg"
    const cropData = {
      "x": 230.5,
      "y": 330.5,
      "width": 135,
      "height": 299,
      "confidence": 0.8520189523696899,
      "class": "person_bike",
      "class_id": 0,
      "detection_id": "007256a1-818e-43d8-9041-f2d01306adae"
  }
    const croppedImage = await this.imageProcessingService.cropImageFromData(fileName, cropData);

    // Set the appropriate content type based on the file extension
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    const contentType = this.getContentType(fileExtension);

    res.set('Content-Type', contentType);
    res.send(croppedImage);
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
