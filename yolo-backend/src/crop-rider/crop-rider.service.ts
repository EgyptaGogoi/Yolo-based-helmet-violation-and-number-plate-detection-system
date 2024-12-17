import { Injectable, NotFoundException } from '@nestjs/common';
import sharp from 'sharp';
import * as fs from 'fs'; // Correct import for fs module
import * as path from 'path'; // Correct import for path module

@Injectable()
export class CropRiderService {
  private croppedImagesFolder = path.join(process.cwd(), 'cropped-images');

  constructor() {
    // Ensure the cropped images folder exists
    if (!fs.existsSync(this.croppedImagesFolder)) {
      fs.mkdirSync(this.croppedImagesFolder, { recursive: true });
    }
  }

  private readonly imageFolder = path.join(__dirname, '..', 'images'); // Path to your image folder

  async cropImage(fileName: string, width: number, height: number, left: number, top: number): Promise<Buffer> {
    const imagePath = path.join(this.imageFolder, fileName);

    if (!fs.existsSync(imagePath)) {
      throw new NotFoundException(`Image with name ${fileName} not found.`);
    }

    const croppedImage = await sharp(imagePath)
      .extract({ width, height, left, top }) // Crop the image
      .toBuffer(); // Convert the result to a Buffer

    return croppedImage;
  }


  // async cropRiders(uploadedFilePath: string, predictions: any[]): Promise<string[]> {
  //   try {
  //     // Step 1: Read the uploaded image file
  //     if (!fs.existsSync(uploadedFilePath)) {
  //       throw new Error('Uploaded file not found');
  //     }
  //     const imageBuffer = fs.readFileSync("D://mca//project//yolo-backend//uploads//connectivity-satyaparkash-commuters-hindustan-initially-transport-innovative_4d921dca-2765-11e6-a271-92fd27615944.jpg");

  //     // Step 2: Loop through predictions and crop the image
  //     const croppedImagePaths: string[] = [];
  //     for (let i = 0; i < predictions.length; i++) {
  //       const { x, y, width, height } = predictions[i];

  //       // Calculate the top-left corner for cropping
  //       const left = Math.max(0, Math.floor(x - width / 2));
  //       const top = Math.max(0, Math.floor(y - height / 2));

  //       // Crop the image using sharp
  //       const croppedImageBuffer = await sharp(imageBuffer)
  //         .extract({
  //           left,
  //           top,
  //           width: Math.floor(width),
  //           height: Math.floor(height),
  //         })
  //         .toBuffer();

  //       // Save the cropped image to the folder
  //       const croppedImagePath = path.join(this.croppedImagesFolder, `cropped_${i}.jpg`);
  //       fs.writeFileSync(croppedImagePath, croppedImageBuffer);

  //       // Add the file path to the array
  //       croppedImagePaths.push(croppedImagePath);
  //     }

  //     // Return the paths of the cropped images
  //     return croppedImagePaths;
  //   } catch (error) {
  //     console.error('Error cropping riders:', error.message);
  //     throw new Error('Error cropping riders');
  //   }
  // }
}
