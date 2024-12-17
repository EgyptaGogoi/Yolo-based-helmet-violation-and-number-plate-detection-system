import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';

@Injectable()
export class ImageProcessingService {
  private readonly imageFolder = path.join(__dirname, '..', 'images'); // Path to your image folder

  async cropImageFromData(fileName: string, cropData: any) {
    const imagePath = 'D:\\mca\\project\\yolo-backend\\uploads\\image.jpg'
    // return "Hello world";
    // return imagePath;
    // Check if the file exists
    console.log(imagePath)
    if (!fs.existsSync(imagePath)) {
      throw new NotFoundException(`Image with name ${fileName} not found.`);
    }

    // Validate cropData
    const { x, y, width, height } = cropData;
    if (x === undefined || y === undefined || width === undefined || height === undefined) {
      throw new BadRequestException('Invalid crop data provided.');
    }

    // Ensure crop dimensions are integers
    const cropRegion = {
  left: Math.floor(x - width / 2),
  top: Math.floor(y - height / 2),
  width: Math.floor(width),
  height: Math.floor(height),
};


    // Get the image metadata to validate cropping region
    const metadata = await sharp(imagePath).metadata();
    if (
      cropRegion.left < 0 ||
      cropRegion.top < 0 ||
      cropRegion.left + cropRegion.width > (metadata.width || 0) ||
      cropRegion.top + cropRegion.height > (metadata.height || 0)
    ) {
      throw new BadRequestException('Crop region exceeds image bounds.');
    }

    // Perform the cropping operation
    const croppedImage = await sharp(imagePath)
      .extract(cropRegion) // Crop the specified region
      .toBuffer(); // Convert to buffer for output

    return croppedImage;
  }
}
