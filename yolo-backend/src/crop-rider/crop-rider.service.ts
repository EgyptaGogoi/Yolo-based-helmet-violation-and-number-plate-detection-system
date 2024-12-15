import { Injectable } from '@nestjs/common';
import axios from 'axios';
import sharp from 'sharp';
import * as fs from 'fs'; // Correct import for fs module
import * as path from 'path'; // Correct import for path module

@Injectable()
export class CropRiderService {
  private croppedImagesFolder = path.join(process.cwd(), 'cropped-images');

  constructor() {
    try {
      // Ensure the cropped images folder exists
      if (!fs.existsSync(this.croppedImagesFolder)) {
        fs.mkdirSync(this.croppedImagesFolder, { recursive: true });
      }
    } catch (error) {
      console.error('Error creating cropped images folder:', error.message);
      throw error;
    }
  }

  async cropRiders(imageUrl: string, predictions: any[]): Promise<string[]> {
    try {
      // Step 1: Download the image
      const response = await axios({
        method: 'GET',
        url: imageUrl,
        responseType: 'arraybuffer', // Fetch the image as a buffer
      });

      const imageBuffer = Buffer.from(response.data);

      // Step 2: Loop through predictions and crop the image
      const croppedImagePaths: string[] = [];
      for (let i = 0; i < predictions.length; i++) {
        const { x, y, width, height } = predictions[i];

        // Calculate the top-left corner for cropping
        const left = Math.max(0, Math.floor(x - width / 2));
        const top = Math.max(0, Math.floor(y - height / 2));

        // Crop the image using sharp
        const croppedImageBuffer = await sharp(imageBuffer)
          .extract({
            left,
            top,
            width: Math.floor(width),
            height: Math.floor(height),
          })
          .toBuffer();

        // Save the cropped image to the folder
        const croppedImagePath = path.join(this.croppedImagesFolder, `cropped_${i}.jpg`);
        fs.writeFileSync(croppedImagePath, croppedImageBuffer);

        // Add the file path to the array
        croppedImagePaths.push(croppedImagePath);
      }

      // Return the paths of the cropped images
      return croppedImagePaths;
    } catch (error) {
      console.error('Error cropping riders:', error.message);
      throw new Error('Error cropping riders');
    }
  }
}
